
import { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { getSongs } from '../services/songService';
import { Song } from '../services/types';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useLanguage } from '../contexts/LanguageContext';
import LyricsPopup from './LyricsPopup';

const FeaturedSongs = () => {
  const { t } = useLanguage();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLyrics, setShowLyrics] = useState<string | null>(null);
  const { isPlaying, currentSong, playAudio } = useAudioPlayer();

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      try {
        const fetchedSongs = await getSongs();
        setSongs(fetchedSongs.slice(0, 5));
      } catch (error) {
        console.error('Error fetching songs:', error);
        setSongs([]);
      }
      setLoading(false);
    };

    fetchSongs();
  }, []);

  const togglePlay = (songId: string, audioUrl?: string) => {
    playAudio(songId, audioUrl);
    if (!isPlaying || currentSong !== songId) {
      setShowLyrics(songId);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">{t('featured.songs')}</h3>
        <p className="text-gray-600">{t('common.loading')}</p>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">{t('featured.songs')}</h3>
        <p className="text-gray-600">No songs available.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-primary">{t('featured.songs')}</h3>
          <button className="text-secondary-dark hover:text-primary text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-4 w-max">
            {songs.map((song) => (
              <div key={song.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-72 flex-shrink-0">
                <div className="flex items-center space-x-4 p-4">
                  <div className="relative">
                    <img
                      src={song.imageUrl || `https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop`}
                      alt={song.title}
                      className="w-16 h-16 rounded-lg object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop`;
                      }}
                    />
                    <button
                      onClick={() => togglePlay(song.id, song.audioUrl)}
                      className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    >
                      {isPlaying && currentSong === song.id ? (
                        <Pause size={20} className="text-white" />
                      ) : (
                        <Play size={20} className="text-white ml-1" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{song.title}</h4>
                    <p className="text-sm text-gray-600 truncate">{song.artist}</p>
                    <p className="text-xs text-gray-500">{song.duration}</p>
                  </div>
                  
                  <button
                    onClick={() => togglePlay(song.id, song.audioUrl)}
                    className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                      isPlaying && currentSong === song.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-secondary hover:text-primary'
                    }`}
                  >
                    {isPlaying && currentSong === song.id ? (
                      <Pause size={18} />
                    ) : (
                      <Play size={18} className="ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <LyricsPopup 
        song={songs.find(s => s.id === showLyrics) || null}
        isOpen={!!showLyrics && isPlaying && currentSong === showLyrics}
        onClose={() => setShowLyrics(null)}
      />
    </>
  );
};

export default FeaturedSongs;
