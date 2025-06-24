
import { useState } from 'react';
import Layout from '../components/Layout';
import SongCard from '../components/SongCard';

const SongsPage = () => {
  const [playingSong, setPlayingSong] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 6;

  const songs = [
    {
      id: 1,
      title: 'Hallelujah Praise',
      artist: 'Ethiopian Orthodox Choir',
      cover: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b/400x400',
      duration: '4:23',
      lyrics: `Hallelujah, praise the Lord\nSing with joy and gladness\nOur hearts are filled with love\nFor His eternal goodness\n\nChorus:\nHallelujah, Hallelujah\nPraise His holy name\nHallelujah, Hallelujah\nForever He shall reign`
    },
    {
      id: 2,
      title: 'Holy Trinity',
      artist: 'Deacon Michael',
      cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475/400x400',
      duration: '3:45',
      lyrics: `In the name of the Father\nAnd of the Son\nAnd of the Holy Spirit\nThree in One\n\nChorus:\nHoly Trinity, we worship Thee\nOne God in three persons\nHoly Trinity, we praise Thee\nFor Your love that never lessens`
    },
    {
      id: 3,
      title: 'Morning Prayer',
      artist: 'St. Mary Choir',
      cover: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d/400x400',
      duration: '5:12',
      lyrics: `As the morning light appears\nWe lift our hearts in prayer\nThank You Lord for this new day\nFor Your love and care\n\nChorus:\nIn the morning, we praise You\nIn the evening, we thank You\nEvery moment of our lives\nWe belong to You`
    },
    {
      id: 4,
      title: 'Blessed Virgin Mary',
      artist: 'St. Gabriel Choir',
      cover: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1/400x400',
      duration: '4:56',
      lyrics: `Hail Mary, full of grace\nMother of our Savior\nIntercede for us today\nWith your loving favor\n\nChorus:\nBlessed Virgin Mary\nPray for us sinners\nBlessed Virgin Mary\nOur hearts are winners`
    },
    {
      id: 5,
      title: 'Ethiopian Hymn',
      artist: 'Traditional',
      cover: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81/400x400',
      duration: '6:18',
      lyrics: `From the mountains of Ethiopia\nTo the valleys below\nWe sing praises to our God\nWhose love will always flow\n\nChorus:\nEthiopia stretches out her hands\nTo God in prayer and praise\nEthiopia lifts her voice\nThroughout all of her days`
    },
    {
      id: 6,
      title: 'Angels Singing',
      artist: 'Heavenly Voices',
      cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f/400x400',
      duration: '3:33',
      lyrics: `Angels singing all around\nHoly, holy is the sound\nGlory to God in the highest\nPeace on earth to all\n\nChorus:\nJoin the angels in their song\nPraise the Lord the whole day long\nJoin the angels in their praise\nAll throughout our earthly days`
    }
  ];

  const totalPages = Math.ceil(songs.length / songsPerPage);
  const currentSongs = songs.slice(
    (currentPage - 1) * songsPerPage,
    currentPage * songsPerPage
  );

  const handleTogglePlay = (songId: number) => {
    if (playingSong === songId) {
      setPlayingSong(null);
    } else {
      setPlayingSong(songId);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Sacred Songs</h1>
          <p className="text-gray-600">Listen to our collection of Ethiopian Orthodox Christian music</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              isPlaying={playingSong === song.id}
              onTogglePlay={handleTogglePlay}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-md transition-colors ${
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
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
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
