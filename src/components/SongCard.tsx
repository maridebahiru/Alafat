
import { useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface SongCardProps {
  song: {
    id: number;
    title: string;
    artist: string;
    cover: string;
    duration: string;
    lyrics: string;
  };
  isPlaying: boolean;
  onTogglePlay: (songId: number) => void;
}

const SongCard = ({ song, isPlaying, onTogglePlay }: SongCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
      <div className="relative">
        <img
          src={song.cover}
          alt={song.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
        <button
          onClick={() => onTogglePlay(song.id)}
          className="absolute bottom-3 right-3 bg-secondary hover:bg-secondary-dark text-primary p-3 rounded-full shadow-lg transition-all hover:scale-105"
        >
          {isPlaying ? (
            <Pause size={20} />
          ) : (
            <Play size={20} className="ml-0.5" />
          )}
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1">{song.title}</h3>
        <p className="text-gray-600 mb-2">{song.artist}</p>
        <p className="text-sm text-gray-500">{song.duration}</p>
        
        {/* Lyrics section with slide animation */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isPlaying ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium text-primary mb-2">Lyrics</h4>
            <div className="text-sm text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-md">
              {song.lyrics}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
