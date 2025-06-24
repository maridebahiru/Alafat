
import { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { Song } from '../services/firebaseService';
import LyricsPopup from './LyricsPopup';

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  onTogglePlay: (songId: string, audioUrl?: string) => void;
}

const SongCard = ({ song, isPlaying, onTogglePlay }: SongCardProps) => {
  const [showLyrics, setShowLyrics] = useState(false);

  const handlePlayClick = () => {
    onTogglePlay(song.id, song.audioUrl);
    if (!isPlaying) {
      setShowLyrics(true);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all">
        <div className="relative">
          <img
            src={song.imageUrl || `https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop`}
            alt={song.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
          <button
            onClick={handlePlayClick}
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
        </div>
      </div>

      <LyricsPopup 
        song={song}
        isOpen={showLyrics && isPlaying}
        onClose={() => setShowLyrics(false)}
      />
    </>
  );
};

export default SongCard;
