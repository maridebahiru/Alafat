
import { useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
  duration: string;
}

const FeaturedSongs = () => {
  const [playingSong, setPlayingSong] = useState<number | null>(null);

  const featuredSongs: Song[] = [
    {
      id: 1,
      title: 'Hallelujah Praise',
      artist: 'Ethiopian Orthodox Choir',
      cover: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b/400x400',
      duration: '4:23'
    },
    {
      id: 2,
      title: 'Holy Trinity',
      artist: 'Deacon Michael',
      cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475/400x400',
      duration: '3:45'
    },
    {
      id: 3,
      title: 'Morning Prayer',
      artist: 'St. Mary Choir',
      cover: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d/400x400',
      duration: '5:12'
    }
  ];

  const togglePlay = (songId: number) => {
    if (playingSong === songId) {
      setPlayingSong(null);
    } else {
      setPlayingSong(songId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary">Featured Songs</h3>
        <button className="text-secondary-dark hover:text-primary text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="grid gap-4">
        {featuredSongs.map((song) => (
          <div key={song.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-4">
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
              
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{song.title}</h4>
                <p className="text-sm text-gray-600">{song.artist}</p>
                <p className="text-xs text-gray-500">{song.duration}</p>
              </div>
              
              <button
                onClick={() => togglePlay(song.id)}
                className={`p-2 rounded-full transition-colors ${
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
  );
};

export default FeaturedSongs;
