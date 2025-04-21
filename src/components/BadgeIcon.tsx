import React from 'react';

type BadgeIconProps = {
  type: 'openai' | 'huggingface';
  mode: 'light' | 'dark';
};

const BadgeIcon = ({ type, mode }: BadgeIconProps): React.ReactElement => {
  if (type === 'openai') {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={mode === 'dark' ? '#d1d5db' : '#374151'} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-6 h-6"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    );
  } else {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 114 114" 
        className="w-6 h-6" 
        fill={mode === 'dark' ? '#d1d5db' : '#374151'}
      >
        <path d="M41.5 23l-21 14.7V76.4L41.5 91.2l20.9-14.8V37.8L41.5 23z" fill={mode === 'dark' ? '#818cf8' : '#4f46e5'} />
        <path d="M72.4 23l-10 7.1v15.2l17.6 2.1L93.5 31V15.9L72.4 23z" fill={mode === 'dark' ? '#c4b5fd' : '#8b5cf6'} />
        <path d="M93.5 51.5l-13.5 9.5v13.7l13.5 9.5 13.5-9.5V61l-13.5-9.5zM51.9 61l-10.4 7.3v7.3l10.4 7.3 10.4-7.3v-7.3L51.9 61z" fill={mode === 'dark' ? '#c4b5fd' : '#8b5cf6'} />
      </svg>
    );
  }
};

export default BadgeIcon; 