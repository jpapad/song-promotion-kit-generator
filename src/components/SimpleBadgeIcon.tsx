import React from 'react';

interface SimpleBadgeIconProps {
  type: 'openai' | 'huggingface';
  mode: 'light' | 'dark';
}

function SimpleBadgeIcon({ type, mode }: SimpleBadgeIconProps) {
  return (
    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
      {type === 'openai' ? 'O' : 'H'}
    </div>
  );
}

export default SimpleBadgeIcon; 