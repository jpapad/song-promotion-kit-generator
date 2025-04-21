import React from 'react';

interface LoadingSpinnerProps {
  darkMode?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ darkMode = false }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Outer glow */}
        <div className={`absolute inset-0 rounded-full ${darkMode ? 'bg-primary-500' : 'bg-primary-400'} blur-xl opacity-20 animate-pulse`}></div>
        
        {/* Spinner container */}
        <div className="relative">
          {/* Gradient circle */}
          <div className={`w-16 h-16 rounded-full ${
            darkMode 
              ? 'bg-gradient-to-tr from-primary-600 to-accent-600' 
              : 'bg-gradient-to-tr from-primary-500 to-accent-500'
          } animate-spin-slow`}>
            {/* Inner cutout to create ring */}
            <div className={`absolute inset-2 rounded-full ${darkMode ? 'bg-dark-400' : 'bg-white'}`}></div>
          </div>
          
          {/* Pulsing dots */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-1">
              {[1, 2, 3].map((_, index) => (
                <div 
                  key={index} 
                  className={`w-1.5 h-1.5 rounded-full ${
                    darkMode ? 'bg-primary-300' : 'bg-primary-600'
                  } animate-pulse`} 
                  style={{ 
                    animationDelay: `${index * 200}ms`,
                    animationDuration: '1.5s' 
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className={`mt-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Δημιουργία περιεχομένου...
      </div>
      
      <div className={`mt-2 max-w-md text-center text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        Παρακαλώ περιμένετε όσο το AI δημιουργεί εξατομικευμένο περιεχόμενο για την προώθηση του τραγουδιού σας
      </div>
    </div>
  );
};

export default LoadingSpinner; 