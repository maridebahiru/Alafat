
import { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { getSongs, Song } from '../services/firebaseService';

const FeaturedSongs = () => {
  const [playingSong, setPlayingSong] = useState<string | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      const fetchedSongs = await getSongs();
      // Take only first 5 songs for featured section
      setSongs(fetchedSongs.slice(0, 5));
      setLoading(false);
    };

    fetchSongs();
  }, []);

  const togglePlay = (songId: string) => {
    if (playingSong === songId) {
      setPlayingSong(null);
    } else {
      setPlayingSong(songId);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">Featured Songs</h3>
        <p className="text-gray-600">Loading songs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary">Featured Songs</h3>
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
                    src={song.cover}
                    alt={song.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <button
                    onClick={() => togglePlay(song.id)}
                    className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                  >
                    {playingSong === song.id ? (
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
                  onClick={() => togglePlay(song.id)}
                  className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                    playingSong === song.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-secondary hover:text-primary'
                  }`}
                >
                  {playingSong === song.id ? (
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
  );
};

export default FeaturedSongs;
