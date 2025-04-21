import React, { useState } from 'react';
import { PromotionKitData } from '../App';

interface PromotionKitProps {
  kit: PromotionKitData;
  darkMode?: boolean;
}

const PromotionKit: React.FC<PromotionKitProps> = ({ kit, darkMode = false }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const exportAsPDF = () => {
    // Εδώ θα μπορούσαμε να προσθέσουμε κώδικα για την εξαγωγή ως PDF
    // Θα χρειαζόταν μια βιβλιοθήκη όπως jsPDF ή html2pdf
    
    // Προσωρινό μήνυμα
    alert('Η λειτουργία εξαγωγής PDF θα είναι διαθέσιμη σύντομα!');
  };

  const exportAsText = () => {
    const content = `
YOUTUBE ΤΙΤΛΟΙ:
${kit.youtubeTitle.join('\n')}

YOUTUBE ΠΕΡΙΓΡΑΦΗ:
${kit.youtubeDescription}

YOUTUBE TAGS:
${kit.youtubeTags.join(' ')}

FACEBOOK POST:
${kit.facebookPost}

INSTAGRAM CAPTION:
${kit.instagramCaption}

TIKTOK CAPTION:
${kit.tiktokCaption}

REELS/SHORTS CAPTIONS:
${kit.reelsShortCaptions.join('\n')}

ΙΔΕΑ ΓΙΑ THUMBNAIL:
${kit.thumbnailIdea}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'promotion-kit.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const CopyButton: React.FC<{ text: string; section: string }> = ({ text, section }) => (
    <button
      onClick={() => copyToClipboard(text, section)}
      className={`text-xs transition-all duration-300 ${
        copiedSection === section 
        ? darkMode 
          ? 'bg-green-700/50 text-green-300' 
          : 'bg-green-100 text-green-800'
        : darkMode 
          ? 'bg-dark-200 hover:bg-dark-300 text-gray-300 hover:text-white' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
      } font-medium py-1.5 px-3 rounded-lg inline-flex items-center transform hover:scale-105 active:scale-95`}
    >
      {copiedSection === section ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Αντιγράφηκε!
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Αντιγραφή
        </>
      )}
    </button>
  );

  const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
    <h3 className={`text-lg font-medium leading-6 ${darkMode ? 'text-gray-200' : 'text-gray-900'} mt-6 mb-3 flex items-center`}>
      <span className={`w-1.5 h-5 rounded-full ${darkMode ? 'bg-primary-400' : 'bg-primary-500'} mr-2`}></span>
      {title}
    </h3>
  );

  const ContentSection: React.FC<{ 
    title: string; 
    content: string | string[]; 
    section: string;
    renderContent?: (content: string | string[]) => React.ReactNode;
  }> = ({ title, content, section, renderContent }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <SectionTitle title={title} />
        {typeof content === 'string' ? (
          <CopyButton text={content} section={section} />
        ) : (
          <CopyButton text={content.join('\n\n')} section={section} />
        )}
      </div>
      <div className={`${
        darkMode 
          ? 'bg-dark-300 border border-dark-200 hover:border-dark-100' 
          : 'bg-white border border-gray-200 hover:border-gray-300'
        } p-4 rounded-xl shadow-sm hover:shadow transition-all duration-300`}
      >
        {renderContent ? renderContent(content) : (
          typeof content === 'string' ? (
            <p className={`whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{content}</p>
          ) : (
            content.map((item, index) => (
              <p key={index} className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item}</p>
            ))
          )
        )}
      </div>
    </div>
  );

  // Προσθήκη social media preview tabs
  const tabs = [
    { id: 'all', name: 'Όλα', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    )},
    { id: 'youtube', name: 'YouTube', icon: (
      <svg className="h-5 w-5 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
      </svg>
    )},
    { id: 'facebook', name: 'Facebook', icon: (
      <svg className="h-5 w-5 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/>
      </svg>
    )},
    { id: 'instagram', name: 'Instagram', icon: (
      <svg className="h-5 w-5 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )},
    { id: 'tiktok', name: 'TikTok', icon: (
      <svg className="h-5 w-5 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    )}
  ];

  // Enhanced social media preview components
  const YouTubePreview = () => (
    <div className={`mt-4 p-5 rounded-xl overflow-hidden transition-all duration-300 ${darkMode ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-white border border-gray-200 hover:border-gray-300'} shadow-sm hover:shadow-md`}>
      <div className="flex items-start space-x-4 flex-col sm:flex-row">
        <div className={`w-full sm:w-48 h-32 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg flex items-center justify-center group overflow-hidden relative mb-4 sm:mb-0`}>
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} z-10 transition-opacity duration-300 group-hover:opacity-0`}>Thumbnail Preview</span>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-accent-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white drop-shadow-md" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="flex-1">
          <h4 className={`font-medium text-base ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{kit.youtubeTitle[0]}</h4>
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="font-semibold">Περιγραφή:</span> {kit.youtubeDescription.substring(0, 100)}...
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {kit.youtubeTags.slice(0, 5).map((tag, index) => (
              <span key={index} className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${
                darkMode ? 'bg-dark-400 text-gray-300' : 'bg-gray-100 text-gray-700'
              }`}>
                {tag}
              </span>
            ))}
            <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${
              darkMode ? 'bg-dark-400 text-gray-400' : 'bg-gray-100 text-gray-500'
            }`}>...</span>
          </div>
        </div>
      </div>
    </div>
  );

  const FacebookPreview = () => (
    <div className={`mt-4 p-5 rounded-xl overflow-hidden transition-all duration-300 ${darkMode ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-white border border-gray-200 hover:border-gray-300'} shadow-sm hover:shadow-md`}>
      <div className="flex items-start flex-col">
        <div className="flex items-center space-x-2 mb-3 w-full">
          <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex-shrink-0 relative group overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-accent-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="flex-1">
            <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Όνομα Καλλιτέχνη</span>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {new Date().toLocaleDateString('el-GR')} • <span className="inline-flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>Δημόσια</span>
            </p>
          </div>
        </div>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-line`}>
          {kit.facebookPost}
        </p>
        <div className={`mt-4 w-full h-48 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg flex items-center justify-center group overflow-hidden relative`}>
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} z-10 transition-opacity duration-300 group-hover:opacity-0`}>Εικόνα Facebook Post</span>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-accent-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="flex w-full mt-4 space-x-2">
          <button className={`flex-1 py-1.5 rounded-lg text-sm font-medium ${darkMode ? 'bg-dark-400 hover:bg-dark-300 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-colors duration-200`}>
            <span className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              Μου αρέσει
            </span>
          </button>
          <button className={`flex-1 py-1.5 rounded-lg text-sm font-medium ${darkMode ? 'bg-dark-400 hover:bg-dark-300 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-colors duration-200`}>
            <span className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Σχόλιο
            </span>
          </button>
          <button className={`flex-1 py-1.5 rounded-lg text-sm font-medium ${darkMode ? 'bg-dark-400 hover:bg-dark-300 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-colors duration-200`}>
            <span className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Κοινοποίηση
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  const InstagramPreview = () => (
    <div className={`mt-4 rounded-xl overflow-hidden transition-all duration-300 ${darkMode ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-white border border-gray-200 hover:border-gray-300'} shadow-sm hover:shadow-md`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden relative group`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-accent-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className={`font-medium text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>artist_profile</span>
          <svg className="h-5 w-5 ml-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </div>
      </div>
      <div className={`w-full h-64 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center group overflow-hidden relative`}>
        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} z-10 transition-opacity duration-300 group-hover:opacity-0`}>Εικόνα Instagram</span>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-accent-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-4">
        <div className="flex space-x-4 mb-3">
          <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <svg className="h-6 w-6 ml-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </div>
        <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
          142 likes
        </div>
        <p className={`text-sm mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>artist_profile</span>{' '}
          {kit.instagramCaption.length > 150 ? `${kit.instagramCaption.substring(0, 150)}...` : kit.instagramCaption}
        </p>
        <button className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>View all 24 comments</button>
        <div className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>2 HOURS AGO</div>
      </div>
    </div>
  );

  const TikTokPreview = () => (
    <div className={`mt-4 rounded-xl overflow-hidden transition-all duration-300 ${darkMode ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-white border border-gray-200 hover:border-gray-300'} shadow-sm hover:shadow-md max-w-xs mx-auto`}>
      <div className={`w-full h-96 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center group overflow-hidden relative rounded-t-xl`}>
        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} z-10 transition-opacity duration-300 group-hover:opacity-0`}>TikTok Video</span>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-accent-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white drop-shadow-md" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 p-4 flex flex-col items-center space-y-4">
          <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden relative group`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-accent-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div>
            <p className={`font-medium text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>@artist_profile</p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Artist Name</p>
          </div>
          <button className={`ml-auto text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-red-500/80 hover:bg-red-500 text-white' : 'bg-red-500 hover:bg-red-600 text-white'} transition-colors duration-200 font-medium`}>
            Follow
          </button>
        </div>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          {kit.tiktokCaption}
        </p>
        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
          #fyp #trending #music #newrelease
        </p>
        <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>2 HOURS AGO</div>
      </div>
    </div>
  );

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow overflow-hidden rounded-2xl transition-all duration-300`}>
      <div className={`px-6 py-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex justify-between items-center">
          <h2 className={`text-2xl font-bold leading-7 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <span className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Το Promotion Kit σας είναι έτοιμο!
            </span>
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={exportAsText}
              className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-105 ${
                darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border-gray-600 hover:shadow-md hover:shadow-gray-900/20' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:shadow-md hover:shadow-gray-200/50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              .TXT
            </button>
            <button
              onClick={exportAsPDF}
              className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-105 ${
                darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 border-gray-600 hover:shadow-md hover:shadow-gray-900/20' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 hover:shadow-md hover:shadow-gray-200/50'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              PDF
            </button>
          </div>
        </div>
        <p className={`mt-2 max-w-2xl text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Αντιγράψτε και χρησιμοποιήστε το περιεχόμενο για την προώθηση του τραγουδιού σας.
        </p>
        
        {/* Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-2 sm:space-x-6 overflow-x-auto pb-1 hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? darkMode 
                      ? 'border-primary-400 text-primary-300 bg-primary-900/10' 
                      : 'border-primary-500 text-primary-600 bg-primary-50'
                    : darkMode 
                      ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-500' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-3 px-3 border-b-2 font-medium text-sm rounded-t-lg flex items-center transition-all duration-200`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} px-6 py-6`}>
        {/* Preview tabs with animation */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === 'youtube' && <div className="animate-fade-in"><YouTubePreview /></div>}
          {activeTab === 'facebook' && <div className="animate-fade-in"><FacebookPreview /></div>}
          {activeTab === 'instagram' && <div className="animate-fade-in"><InstagramPreview /></div>}
          {activeTab === 'tiktok' && <div className="animate-fade-in"><TikTokPreview /></div>}
        </div>
        
        {/* Content sections */}
        <div className="mt-4">
          {(activeTab === 'all' || activeTab === 'youtube') && (
            <div className="animate-fade-in space-y-6">
              <ContentSection 
                title="YouTube Τίτλοι" 
                content={kit.youtubeTitle} 
                section="youtubeTitle"
                renderContent={(content) => (
                  <ul className={`list-disc pl-5 space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {(content as string[]).map((title, index) => (
                      <li key={index} className="transition-all duration-200 hover:translate-x-1">{title}</li>
                    ))}
                  </ul>
                )}
              />
              
              <ContentSection 
                title="YouTube Περιγραφή" 
                content={kit.youtubeDescription} 
                section="youtubeDescription" 
              />
              
              <ContentSection 
                title="YouTube Tags" 
                content={kit.youtubeTags.join(' ')} 
                section="youtubeTags" 
              />
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'facebook') && (
            <div className="animate-fade-in">
              <ContentSection 
                title="Facebook Post" 
                content={kit.facebookPost} 
                section="facebookPost" 
              />
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'instagram') && (
            <div className="animate-fade-in">
              <ContentSection 
                title="Instagram Caption" 
                content={kit.instagramCaption} 
                section="instagramCaption" 
              />
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'tiktok') && (
            <div className="animate-fade-in space-y-6">
              <ContentSection 
                title="TikTok Caption" 
                content={kit.tiktokCaption} 
                section="tiktokCaption" 
              />

              <ContentSection 
                title="Reels/Shorts Captions" 
                content={kit.reelsShortCaptions} 
                section="reelsShortCaptions"
                renderContent={(content) => (
                  <ul className={`list-disc pl-5 space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {(content as string[]).map((caption, index) => (
                      <li key={index} className="transition-all duration-200 hover:translate-x-1">{caption}</li>
                    ))}
                  </ul>
                )}
              />
            </div>
          )}

          {(activeTab === 'all') && (
            <div className="animate-fade-in">
              <ContentSection 
                title="Ιδέα για Thumbnail" 
                content={kit.thumbnailIdea} 
                section="thumbnailIdea" 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromotionKit; 