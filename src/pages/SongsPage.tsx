
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SongCard from '../components/SongCard';
import { getSongs } from '../services/songService';
import { Song } from '../services/types';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useLanguage } from '../contexts/LanguageContext';
import MorphingPageDots from '../components/ui/morphing-page-dots';
import { PageLoader } from '../components/PageLoader';

const SongsPage = () => {
  const { t } = useLanguage();
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
    return <PageLoader />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">{t('songs.title')}</h1>
          <p className="text-gray-600 text-sm sm:text-base">{t('songs.description')}</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <img 
              src="/img/c5c1c99b-6655-46d3-8dfa-8100276eb20e.png" 
              alt="Alafat Logo" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 object-contain"
            />
            <input
              type="text"
              placeholder={t('songs.searchPlaceholder')}
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
            <p className="text-gray-600">{t('songs.noSongs')}</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <MorphingPageDots
            total={totalPages}
            activeIndex={currentPage - 1}
            onChange={(index) => setCurrentPage(index + 1)}
          />
        )}
      </div>
    </Layout>
  );
};

export default SongsPage;
