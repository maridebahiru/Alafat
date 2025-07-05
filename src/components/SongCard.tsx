
import { Play, Pause, Heart, Download } from 'lucide-react';
import { Song } from '../services/types';

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  onTogglePlay: (songId: string, audioUrl?: string) => void;
}

const SongCard = ({ song, isPlaying, onTogglePlay }: SongCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div 
        className="h-48 bg-cover bg-center bg-gray-200 relative"
        style={{ backgroundImage: song.imageUrl ? `url(${song.imageUrl})` : undefined }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <button
            onClick={() => onTogglePlay(song.id, song.audioUrl)}
            className="bg-white hover:bg-gray-100 text-primary p-4 rounded-full transition-colors"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{song.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{song.artist}</p>
        <p className="text-xs text-gray-500 mb-3">{song.duration}</p>
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => onTogglePlay(song.id, song.audioUrl)}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
          >
            {isPlaying ? <Pause size={16} className="mr-1" /> : <Play size={16} className="mr-1" />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          
          <div className="flex space-x-2">
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <Heart size={18} />
            </button>
            <button className="text-gray-400 hover:text-primary transition-colors">
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
