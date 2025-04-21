import React, { useState, useEffect } from 'react';
import { SongFormData } from '../App';

interface SongFormProps {
  onSubmit: (data: SongFormData) => void;
  isLoading?: boolean;
  darkMode?: boolean;
  initialData?: SongFormData;
  apiType?: 'openai' | 'huggingface';
}

const SongForm: React.FC<SongFormProps> = ({ 
  onSubmit, 
  isLoading = false, 
  darkMode = false,
  initialData,
  apiType = 'openai'
}) => {
  const [formData, setFormData] = useState<SongFormData>({
    title: '',
    artist: '',
    description: '',
    genre: ''
  });
  const [focused, setFocused] = useState<string | null>(null);

  // Update formData when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFocus = (name: string) => {
    setFocused(name);
  };

  const handleBlur = () => {
    setFocused(null);
  };

  const getInputClasses = (name: string) => {
    return `w-full px-4 py-3 rounded-xl transition-all duration-300 outline-none ${
      focused === name 
        ? darkMode 
          ? 'bg-dark-300 border-primary-500 border-2 shadow-[0_0_0_1px_rgba(99,102,241,0.4)]' 
          : 'bg-white border-primary-500 border-2 shadow-[0_0_0_2px_rgba(99,102,241,0.2)]'
        : darkMode 
          ? 'bg-dark-200 border-dark-100 hover:border-dark-50 border focus:ring-0' 
          : 'bg-white border-gray-200 hover:border-gray-300 border focus:ring-0'
    } ${
      darkMode 
        ? 'text-white placeholder-gray-500' 
        : 'text-gray-800 placeholder-gray-400'
    }`;
  };

  const genreOptions = [
    { value: "", label: "Επιλέξτε είδος" },
    { value: "Μπαλάντα", label: "Μπαλάντα" },
    { value: "Ροκ", label: "Ροκ" },
    { value: "Λαϊκό", label: "Λαϊκό" },
    { value: "Ποπ", label: "Ποπ" },
    { value: "Έντεχνο", label: "Έντεχνο" },
    { value: "Ραπ", label: "Ραπ" },
    { value: "Ηλεκτρονική", label: "Ηλεκτρονική" },
    { value: "Χιπ Χοπ", label: "Χιπ Χοπ" },
    { value: "R&B", label: "R&B" },
    { value: "Τζαζ", label: "Τζαζ" },
    { value: "Ρεμπέτικο", label: "Ρεμπέτικο" },
    { value: "Δημοτικά", label: "Δημοτικά" }
  ];

  return (
    <div className={`overflow-hidden rounded-2xl transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-dark-200 to-dark-300 border border-dark-100' 
        : 'bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100'
    }`}>
      {/* Header */}
      <div className={`px-8 py-6 border-b ${darkMode ? 'border-dark-100' : 'border-gray-100'}`}>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Στοιχεία Τραγουδιού
        </h2>
        <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Συμπληρώστε τα παρακάτω στοιχεία για να δημιουργήσετε περιεχόμενο προώθησης
        </p>
        
        {/* API Type Badge */}
        <div className="mt-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            apiType === 'openai'
              ? (darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800')
              : (darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800')
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1 ${
              apiType === 'openai'
                ? 'bg-green-400'
                : 'bg-blue-400'
            }`}></span>
            {apiType === 'openai' ? 'OpenAI API' : 'Hugging Face API'}
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-8 py-6">
        <div className="space-y-6">
          {/* Τίτλος */}
          <div className="relative">
            <label 
              htmlFor="title" 
              className={`block text-sm font-medium mb-2 transition-colors ${
                focused === 'title' 
                  ? darkMode ? 'text-primary-400' : 'text-primary-600' 
                  : darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Τίτλος Τραγουδιού
            </label>
            <div className="relative">
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                onFocus={() => handleFocus('title')}
                onBlur={handleBlur}
                className={getInputClasses('title')}
                placeholder="π.χ. Το Καλοκαίρι Μου"
              />
              <div className={`absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none ${
                formData.title ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-200`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-500'}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Καλλιτέχνης */}
          <div className="relative">
            <label 
              htmlFor="artist" 
              className={`block text-sm font-medium mb-2 transition-colors ${
                focused === 'artist' 
                  ? darkMode ? 'text-primary-400' : 'text-primary-600' 
                  : darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Όνομα Καλλιτέχνη/Συγκροτήματος
            </label>
            <div className="relative">
              <input
                type="text"
                name="artist"
                id="artist"
                required
                value={formData.artist}
                onChange={handleChange}
                onFocus={() => handleFocus('artist')}
                onBlur={handleBlur}
                className={getInputClasses('artist')}
                placeholder="π.χ. Μαρία Παπαδοπούλου"
              />
              <div className={`absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none ${
                formData.artist ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-200`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-500'}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Μουσικό Είδος */}
          <div className="relative">
            <label 
              htmlFor="genre" 
              className={`block text-sm font-medium mb-2 transition-colors ${
                focused === 'genre' 
                  ? darkMode ? 'text-primary-400' : 'text-primary-600' 
                  : darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Μουσικό Είδος
            </label>
            <div className="relative">
              <select
                id="genre"
                name="genre"
                required
                value={formData.genre}
                onChange={handleChange}
                onFocus={() => handleFocus('genre')}
                onBlur={handleBlur}
                className={`${getInputClasses('genre')} appearance-none pr-10`}
              >
                {genreOptions.map((option) => (
                  <option 
                    key={option.value} 
                    value={option.value}
                    className={darkMode ? 'bg-dark-200 text-white' : 'bg-white text-gray-800'}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 transition-transform duration-300 ${
                    focused === 'genre' ? 'rotate-180' : ''
                  } ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Περιγραφή */}
          <div className="relative">
            <label 
              htmlFor="description" 
              className={`block text-sm font-medium mb-2 transition-colors ${
                focused === 'description' 
                  ? darkMode ? 'text-primary-400' : 'text-primary-600' 
                  : darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Περιγραφή Τραγουδιού
            </label>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                onFocus={() => handleFocus('description')}
                onBlur={handleBlur}
                className={`${getInputClasses('description')} resize-none`}
                placeholder="Γράψτε μια σύντομη περιγραφή του τραγουδιού σας..."
              />
              <div className={`absolute top-3 right-0 flex items-start px-3 pointer-events-none ${
                formData.description ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-200`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-500'}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <p className={`mt-2 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Συμπεριλάβετε συναισθήματα, θέμα και μουσικό ύφος. Όσο πιο λεπτομερής είναι η περιγραφή, τόσο καλύτερα αποτελέσματα θα έχετε.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              darkMode 
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 focus:ring-primary-500' 
                : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 focus:ring-primary-500'
            } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Δημιουργία...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {initialData ? 'Ενημέρωση Promotion Kit' : 'Δημιουργία Promotion Kit'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SongForm; 