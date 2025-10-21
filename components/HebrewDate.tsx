import React from 'react';
import { HebrewDateInfo } from '../types';

interface HebrewDateProps {
    hebrewDateInfo: HebrewDateInfo | null;
    loading: boolean;
    error: string | null;
}

const HebrewDate: React.FC<HebrewDateProps> = ({ hebrewDateInfo, loading, error }) => {
  const removeNikud = (text: string): string => {
    if (!text) return '';
    return text.replace(/[\u0591-\u05C7\u05B0-\u05BD\u05BF]/g, '');
  };

  if (loading) {
    return <p className="text-4xl font-title text-amber-700">טוען תאריך עברי...</p>;
  }
  if (error) {
    return <p className="text-2xl font-title text-stone-500">{error}</p>;
  }
  if (!hebrewDateInfo) {
    return null;
  }

  const allEvents = hebrewDateInfo.events || [];
  const cleanedEvents = allEvents.map(removeNikud);
  
  const parasha = cleanedEvents.find(e => e.startsWith('פרשת'));
  const otherEvents = cleanedEvents.filter(e => e !== parasha);

  return (
    <div>
      <p className="text-[2em] leading-normal font-title text-amber-700">{removeNikud(hebrewDateInfo.hebrew)}</p>
      {parasha && (
          <p className="font-normal text-[2em] leading-normal text-stone-600 mt-2">{parasha}</p>
      )}
      {otherEvents.length > 0 && (
          <p className="text-[1.2em] leading-normal text-amber-600 mt-1">{otherEvents.join(', ')}</p>
      )}
    </div>
  );
};

export default HebrewDate;
