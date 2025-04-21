import React, { useState, useEffect } from 'react';
import SongForm from './components/SongForm';
import PromotionKit from './components/PromotionKit';
import LoadingSpinner from './components/LoadingSpinner';
import NewBadgeIcon from './components/NewBadgeIcon';
// Import both API implementations
import { generatePromotionKit as generateWithOpenAI } from './api/openai';
import { generatePromotionKit as generateWithHuggingFace } from './api/aiService';

// Define the types for the form input
export interface SongFormData {
  title: string;
  artist: string;
  description: string;
  genre: string;
}

// Define the types for the API response
export interface PromotionKitData {
  youtubeTitle: string[];
  youtubeDescription: string;
  youtubeTags: string[];
  facebookPost: string;
  instagramCaption: string;
  tiktokCaption: string;
  reelsShortCaptions: string[];
  thumbnailIdea: string;
}

// Define the type for a saved kit that includes both form data and result
interface SavedKit {
  id: string;
  date: string;
  formData: SongFormData;
  kitData: PromotionKitData;
  apiType: 'openai' | 'huggingface';
}

// API type options
type ApiType = 'openai' | 'huggingface';

function App() {
  const [promotionKit, setPromotionKit] = useState<PromotionKitData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState<SavedKit[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<SongFormData | null>(null);
  const [apiType, setApiType] = useState<ApiType>('huggingface'); // Default to Hugging Face instead of OpenAI
  
  // Έλεγχος προτίμησης χρήστη για dark mode και API type κατά την εκκίνηση
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
    
    // Αποθήκευση της προτίμησης στο localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
    }
    
    // Φόρτωση του επιλεγμένου API
    const savedApiType = localStorage.getItem('apiType');
    if (savedApiType && (savedApiType === 'openai' || savedApiType === 'huggingface')) {
      setApiType(savedApiType as ApiType);
    }
    
    // Φόρτωση του ιστορικού kits από το localStorage
    const savedHistory = localStorage.getItem('kitHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (err) {
        console.error('Error loading history:', err);
      }
    }
  }, []);
  
  // Αποθήκευση της προτίμησης όταν αλλάζει
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    
    // Προσθήκη ή αφαίρεση της κλάσης dark στο html
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  // Αποθήκευση του επιλεγμένου API όταν αλλάζει
  useEffect(() => {
    localStorage.setItem('apiType', apiType);
  }, [apiType]);
  
  // Αποθήκευση του ιστορικού όταν αλλάζει
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('kitHistory', JSON.stringify(history));
    }
  }, [history]);

  const handleFormSubmit = async (formData: SongFormData) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentFormData(formData);
      
      // Choose the appropriate API implementation based on apiType
      let result;
      if (apiType === 'openai') {
        result = await generateWithOpenAI(formData);
      } else {
        result = await generateWithHuggingFace(formData);
      }
      
      setPromotionKit(result);
      
      // Προσθήκη του νέου kit στο ιστορικό
      const newKit: SavedKit = {
        id: Date.now().toString(),
        date: new Date().toLocaleString('el-GR'),
        formData,
        kitData: result,
        apiType
      };
      
      setHistory(prev => [newKit, ...prev.slice(0, 9)]); // Κράτα τα τελευταία 10
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Υπήρξε ένα σφάλμα κατά την επεξεργασία του αιτήματός σας. Παρακαλώ δοκιμάστε ξανά.');
      console.error('Error generating promotion kit:', err);
    }
  };
  
  const loadSavedKit = (kit: SavedKit) => {
    setPromotionKit(kit.kitData);
    setCurrentFormData(kit.formData);
    setApiType(kit.apiType || 'openai'); // Set the API type that was used
    setShowHistory(false);
  };
  
  const deleteSavedKit = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Αποτρέπει το κλικ να φτάσει στο parent element
    setHistory(prev => prev.filter(kit => kit.id !== id));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'dark bg-gradient-to-br from-dark-300 via-dark-400 to-dark-500' 
        : 'bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 bg-size-200 animate-gradient'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <div className="relative overflow-hidden mb-12">
          <div className={`absolute inset-0 ${darkMode ? 'bg-dark-300/30' : 'bg-white/30'} backdrop-blur-sm rounded-3xl`}></div>
          <div className="relative z-10 px-6 py-8 rounded-3xl overflow-hidden">
            <div className={`${darkMode ? 'bg-gradient-to-r from-primary-700/20 to-accent-700/20' : 'bg-gradient-to-r from-primary-100/30 to-accent-100/30'} absolute inset-0 -z-10 rounded-3xl`}></div>
            
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"></div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="text-center sm:text-left">
                <h1 className={`text-3xl font-bold tracking-tight sm:text-4xl mb-2 ${
                  darkMode 
                    ? 'text-white drop-shadow-text-light bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-300' 
                    : 'text-gray-900 drop-shadow-text'
                }`}>
                  Song Promotion Kit Generator
                </h1>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Δημιουργήστε αυτόματα περιεχόμενο για την προώθηση του τραγουδιού σας
                </p>
              </div>
              
              <div className="flex space-x-3">
                {/* API Type Toggle Button */}
                <button 
                  onClick={() => setApiType(apiType === 'openai' ? 'huggingface' : 'openai')}
                  className={`p-1 rounded-md ml-2 ${darkMode ? 
                    (apiType === 'huggingface' ? 'bg-indigo-700 hover:bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600') : 
                    (apiType === 'huggingface' ? 'bg-indigo-100 hover:bg-indigo-200' : 'bg-gray-100 hover:bg-gray-200')
                  }`}
                  aria-label={`Εναλλαγή σε ${apiType === 'openai' ? 'Hugging Face' : 'OpenAI'} API`}
                  title={`Εναλλαγή σε ${apiType === 'openai' ? 'Hugging Face' : 'OpenAI'} API`}
                >
                  <NewBadgeIcon mode={darkMode ? 'dark' : 'light'} type={apiType === 'openai' ? 'huggingface' : 'openai'} />
                </button>
                
                <button 
                  onClick={() => setShowHistory(!showHistory)}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    darkMode 
                      ? 'bg-dark-200 hover:bg-dark-100 text-secondary-400 hover:text-secondary-300 border border-dark-100 hover:border-secondary-700' 
                      : 'bg-white hover:bg-primary-50 text-primary-600 hover:text-primary-700 border border-gray-200 hover:border-primary-300 shadow-sm hover:shadow'
                  }`}
                  aria-label="Show history"
                  title="Ιστορικό"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => setDarkMode(!darkMode)} 
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    darkMode 
                      ? 'bg-dark-200 hover:bg-dark-100 text-yellow-400 hover:text-yellow-300 border border-dark-100 hover:border-yellow-700' 
                      : 'bg-white hover:bg-primary-50 text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-primary-300 shadow-sm hover:shadow'
                  }`}
                  aria-label="Toggle dark mode"
                  title={darkMode ? 'Φωτεινό θέμα' : 'Σκοτεινό θέμα'}
                >
                  {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300 hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* API Status Indicator */}
            <div className="mt-4 flex justify-center sm:justify-start">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                apiType === 'openai'
                  ? (darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800')
                  : (darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800')
              }`}>
                <span className={`w-2 h-2 rounded-full mr-1.5 ${
                  apiType === 'openai'
                    ? 'bg-green-400'
                    : 'bg-blue-400'
                }`}></span>
                {apiType === 'openai' ? 'OpenAI API' : 'Hugging Face API'}
              </div>
            </div>
          </div>
        </div>

        {/* History panel */}
        {showHistory && (
          <div className={`mb-8 overflow-hidden transition-all duration-300 transform ${showHistory ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
            <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-dark-200/80 backdrop-blur-sm border border-dark-100' : 'bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100'}`}>
              <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-100 flex justify-between items-center">
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <span className="inline-block mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Ιστορικό Kit
                </h2>
                <button
                  onClick={() => setShowHistory(false)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    darkMode 
                      ? 'hover:bg-dark-100 text-gray-400 hover:text-gray-200' 
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="px-6 py-4">
                {history.length === 0 ? (
                  <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-sm font-medium">
                      Δεν υπάρχουν αποθηκευμένα kits. Δημιουργήστε το πρώτο σας!
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {history.map(kit => (
                      <li 
                        key={kit.id} 
                        className={`p-4 rounded-xl transition-all duration-200 cursor-pointer flex justify-between items-center hover:scale-[1.01] ${
                          darkMode 
                            ? 'bg-dark-300 hover:bg-dark-400 border border-dark-200' 
                            : 'bg-gray-50 hover:bg-gray-100 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow'
                        }`}
                        onClick={() => loadSavedKit(kit)}
                      >
                        <div className="flex flex-col">
                          <h3 className={`font-medium text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {kit.formData.title} - {kit.formData.artist}
                          </h3>
                          <div className="flex items-center mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              darkMode 
                                ? 'bg-gray-700 text-gray-300' 
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {kit.formData.genre}
                            </span>
                            <span className={`ml-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {kit.date}
                            </span>
                            
                            {/* API Type Badge */}
                            <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              kit.apiType === 'openai'
                                ? (darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800')
                                : (darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800')
                            }`}>
                              {kit.apiType === 'openai' ? 'OpenAI' : 'Hugging Face'}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => deleteSavedKit(kit.id, e)}
                          className={`p-1.5 rounded-lg transition-colors duration-200 ${
                            darkMode 
                              ? 'hover:bg-dark-200 text-gray-400 hover:text-red-300' 
                              : 'hover:bg-gray-200 text-gray-500 hover:text-red-500'
                          }`}
                          aria-label="Delete kit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className={`order-1 md:order-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <SongForm 
              onSubmit={handleFormSubmit} 
              initialData={currentFormData || undefined}
              darkMode={darkMode}
              apiType={apiType}
            />
          </div>

          {/* Results Section */}
          <div className="order-2 md:order-2">
            {loading ? (
              <LoadingSpinner darkMode={darkMode} />
            ) : error ? (
              <div className={`p-6 rounded-2xl ${
                darkMode 
                  ? 'bg-red-900/20 border border-red-800 text-red-300' 
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium">Σφάλμα</h3>
                </div>
                <p className="mt-2">{error}</p>
                <button 
                  onClick={() => setError(null)}
                  className={`mt-4 px-4 py-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'bg-red-800 hover:bg-red-700 text-white' 
                      : 'bg-red-100 hover:bg-red-200 text-red-800'
                  }`}
                >
                  Κλείσιμο
                </button>
              </div>
            ) : promotionKit ? (
              <PromotionKit kit={promotionKit} darkMode={darkMode} />
            ) : (
              <div className={`flex flex-col items-center justify-center h-full p-10 rounded-2xl border-2 border-dashed ${
                darkMode 
                  ? 'bg-dark-300/50 border-dark-100 text-gray-400' 
                  : 'bg-white/50 border-gray-200 text-gray-500'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <h3 className={`text-xl font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Δεν έχει δημιουργηθεί kit ακόμα
                </h3>
                <p className="text-center">
                  Συμπληρώστε τη φόρμα με τα στοιχεία του τραγουδιού σας για να δημιουργήσετε το πρώτο σας promotion kit!
                </p>
                <p className="mt-4 text-sm text-center">
                  Τρέχων AI API: <span className={`font-semibold ${apiType === 'openai' ? 'text-green-500' : 'text-blue-500'}`}>
                    {apiType === 'openai' ? 'OpenAI' : 'Hugging Face'}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
