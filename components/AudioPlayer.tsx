import React from 'react';

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title }) => {
  return (
    <div className="my-4">
      {title && <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{title}</p>}
      <audio controls className="w-full max-w-md">
        <source src={src} type="audio/mp4" />
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

