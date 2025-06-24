
import { X } from 'lucide-react';
import { Song } from '../services/firebaseService';

interface LyricsPopupProps {
  song: Song | null;
  isOpen: boolean;
  onClose: () => void;
}

const LyricsPopup = ({ song, isOpen, onClose }: LyricsPopupProps) => {
  if (!isOpen || !song) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="font-semibold text-lg text-primary">{song.title}</h3>
            <p className="text-sm text-gray-600">{song.artist}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-96">
          <div className="whitespace-pre-line text-gray-700 leading-relaxed">
            {song.lyrics}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LyricsPopup;
