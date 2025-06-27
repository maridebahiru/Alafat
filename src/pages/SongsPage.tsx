
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SongCard from '../components/SongCard';
import { getSongs, Song } from '../services/firebaseService';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

const SongsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const { isPlaying, currentSong, playAudio } = useAudioPlayer();
  const songsPerPage = 6;

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      const fetchedSongs = await getSongs();
      setSongs(fetchedSongs);
      setLoading(false);
    };

    fetchSongs();
  }, []);

  const totalPages = Math.ceil(songs.length / songsPerPage);
  const currentSongs = songs.slice(
    (currentPage - 1) * songsPerPage,
    currentPage * songsPerPage
  );

  const handleTogglePlay = (songId: string, audioUrl?: string) => {
    playAudio(songId, audioUrl);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-gray-600">Loading songs...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Sacred Songs</h1>
          <p className="text-gray-600 text-sm sm:text-base">Listen to our collection of Ethiopian Orthodox Christian music</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {currentSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              isPlaying={isPlaying && currentSong === song.id}
              onTogglePlay={handleTogglePlay}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2 flex-wrap">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors text-sm sm:text-base"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 sm:px-4 py-2 rounded-md transition-colors text-sm sm:text-base ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors text-sm sm:text-base"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SongsPage;
