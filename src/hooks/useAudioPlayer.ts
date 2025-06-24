
import { useState, useRef, useEffect } from 'react';

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = (songId: string, audioUrl?: string) => {
    if (currentSong === songId && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      if (audioUrl) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.play();
        setIsPlaying(true);
        setCurrentSong(songId);
        
        audioRef.current.onended = () => {
          setIsPlaying(false);
          setCurrentSong(null);
        };
      } else {
        // Simulate playing without actual audio
        setIsPlaying(true);
        setCurrentSong(songId);
        
        // Auto stop after 30 seconds (demo)
        setTimeout(() => {
          setIsPlaying(false);
          setCurrentSong(null);
        }, 30000);
      }
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setCurrentSong(null);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return {
    isPlaying: currentSong ? isPlaying : false,
    currentSong,
    playAudio,
    stopAudio
  };
};
