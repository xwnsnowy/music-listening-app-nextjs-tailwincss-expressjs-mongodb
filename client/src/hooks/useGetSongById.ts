"use client"

import { getSongById } from '@/services/songServices';
import { Songs } from '@/types/types';
import { useState, useEffect } from 'react';

export const useFetchSongById = (songId: string | null) => {
  const [song, setSong] = useState<Songs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const data = await getSongById(songId!);
        setSong(data.song);
      } catch (err) {
        setError("Error fetching songs");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [songId]);

  return { song, loading, error };
};
