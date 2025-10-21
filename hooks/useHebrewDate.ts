import { useState, useEffect } from 'react';
import { HebrewDateInfo } from '../types';

const HEBREW_DATE_CACHE_KEY = 'hebrewDateCache';

interface CachedHebrewDate {
    data: HebrewDateInfo;
    date: string; // YYYY-MM-DD format
}

export const useHebrewDate = () => {
  const [hebrewDateInfo, setHebrewDateInfo] = useState<HebrewDateInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    // Attempt to load from cache immediately
    let hasValidCache = false;
    try {
      const cachedItem = window.localStorage.getItem(HEBREW_DATE_CACHE_KEY);
      if (cachedItem) {
        const cached: CachedHebrewDate = JSON.parse(cachedItem);
        // Only use cache if it's for the current day
        if (cached.date === dateString) {
          if (isMounted) {
            setHebrewDateInfo(cached.data);
            setLoading(false);
            hasValidCache = true;
          }
        }
      }
    } catch (err) {
      console.error("Error reading Hebrew date from cache", err);
      // Clear potentially corrupt cache
      window.localStorage.removeItem(HEBREW_DATE_CACHE_KEY);
    }

    const fetchHebrewDate = async () => {
      // If we don't have cached data, we are in a loading state.
      // If we do have data, we can refresh in the background without a loading spinner.
      if (!hasValidCache && isMounted) {
        setLoading(true);
      }
      
      try {
        const response = await fetch(`https://www.hebcal.com/converter?cfg=json&g2h=1&date=${dateString}&lg=h`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const newHebrewDateInfo: HebrewDateInfo = {
            hebrew: data.hebrew,
            events: data.events
        };

        if (isMounted) {
          setHebrewDateInfo(newHebrewDateInfo);
          setError(null); // Clear error on success
          
          // Save to cache
          try {
            const cacheData: CachedHebrewDate = { data: newHebrewDateInfo, date: dateString };
            window.localStorage.setItem(HEBREW_DATE_CACHE_KEY, JSON.stringify(cacheData));
          } catch (cacheErr) {
            console.error("Error saving Hebrew date to cache", cacheErr);
          }
        }
      } catch (fetchErr) {
        console.error("Failed to fetch Hebrew date:", fetchErr);
        // Only set an error if we don't have anything to display
        if (!hasValidCache && isMounted) {
            setError('לא ניתן היה לטעון את התאריך העברי');
        }
      } finally {
        if (isMounted) {
            setLoading(false);
        }
      }
    };

    fetchHebrewDate();
    const intervalId = setInterval(fetchHebrewDate, 3600000); // Refresh every hour

    return () => {
        isMounted = false;
        clearInterval(intervalId);
    };
  }, []);

  return { hebrewDateInfo, loading, error };
};
