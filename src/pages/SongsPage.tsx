
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SongCard from '../components/SongCard';
import { getSongs } from '../services/songService';
import { Song } from '../services/types';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { Search } from 'lucide-react';

const SongsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [songs, setSongs] = useState<Song[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { isPlaying, currentSong, playAudio } = useAudioPlayer();
  const songsPerPage = 6;

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      const fetchedSongs = await getSongs();
      setSongs(fetchedSongs);
      setFilteredSongs(fetchedSongs);
      setLoading(false);
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    let filtered = songs;
    
    if (searchTerm) {
      filtered = songs.filter(song => 
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredSongs(filtered);
    setCurrentPage(1);
  }, [songs, searchTerm]);

  const totalPages = Math.ceil(filteredSongs.length / songsPerPage);
  const currentSongs = filteredSongs.slice(
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

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search songs or artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
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

        {/* No songs message */}
        {filteredSongs.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">No songs found for your search criteria.</p>
          </div>
        )}

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
