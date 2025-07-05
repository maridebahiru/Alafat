
import { useState, useEffect } from 'react';
import { Music, Play, Pause } from 'lucide-react';
import { getSongs } from '../services/songService';
import { Song } from '../services/types';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useLanguage } from '../contexts/LanguageContext';

const FeaturedSongs = () => {
  const { t } = useLanguage();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const { isPlaying, currentSong, playAudio } = useAudioPlayer();

  useEffect(() => {
    const fetchFeaturedSongs = async () => {
      const allSongs = await getSongs();
      setSongs(allSongs.slice(0, 3)); // Get first 3 songs as featured
      setLoading(false);
    };

    fetchFeaturedSongs();
  }, []);

  const handleTogglePlay = (songId: string, audioUrl?: string) => {
    playAudio(songId, audioUrl);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
          <Music className="w-6 h-6 mr-2" />
          {t('songs.featured')}
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
        <Music className="w-6 h-6 mr-2" />
        Featured Songs
      </h2>
      
      <div className="grid md:grid-cols-3 gap-4">
        {songs.map((song) => (
          <div key={song.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-12 bg-cover bg-center bg-gray-200 rounded-lg flex-shrink-0"
                style={{ backgroundImage: song.imageUrl ? `url(${song.imageUrl})` : undefined }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{song.title}</h3>
                <p className="text-sm text-gray-600 truncate">{song.artist}</p>
              </div>
              <button
                onClick={() => handleTogglePlay(song.id, song.audioUrl)}
                className="bg-primary hover:bg-primary/90 text-white p-2 rounded-full transition-colors"
              >
                {isPlaying && currentSong === song.id ? (
                  <Pause size={16} />
                ) : (
                  <Play size={16} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <a
          href="/songs"
          className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
        >
          View All Songs →
        </a>
      </div>
    </div>
  );
};

export default FeaturedSongs;
