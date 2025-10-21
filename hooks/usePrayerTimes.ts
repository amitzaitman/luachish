import { useState } from 'react';
import { EventItem } from '../types';

const EVENTS_KEY = 'synagogueEvents';

const defaultEvents: EventItem[] = [
  { id: '1', name: 'מנחה וקבלת שבת', time: '18:00', type: 'prayer', dayCategory: 'evening' },
  { id: '2', name: 'ערבית (ליל שבת)', time: '19:00', type: 'prayer', dayCategory: 'evening' },
  { id: '3', name: 'שחרית (ותיקין)', time: '06:00', type: 'prayer', dayCategory: 'day' },
  { id: '4', name: 'שחרית', time: '08:30', type: 'prayer', dayCategory: 'day', note: 'קידוש לאחר התפילה' },
  { id: '5', name: 'שיעור דף יומי', time: '10:00', type: 'class', dayCategory: 'day' },
  { id: '6', name: 'מנחה', time: '13:30', type: 'prayer', dayCategory: 'day' },
  { id: '7', name: 'לימוד אבות ובנים', time: '17:00', type: 'class', dayCategory: 'day' },
  { id: '8', name: 'ערבית (מוצ"ש)', time: '20:30', type: 'prayer', dayCategory: 'day' },
  { id: '9', name: 'כגכג (מוצ"ש)', time: '23:30', type: 'prayer', dayCategory: 'day' },
];

export const useEvents = () => {
  const [events, setEvents] = useState<EventItem[]>(() => {
    try {
      const storedEvents = window.localStorage.getItem(EVENTS_KEY);
      if (storedEvents) {
        const parsed = JSON.parse(storedEvents);
        if (Array.isArray(parsed) && parsed.every(item => 'id' in item && 'name' in item && 'time' in item && 'type' in item && 'dayCategory' in item)) {
          return parsed;
        }
      }
      return defaultEvents;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return defaultEvents;
    }
  });

  const saveEvents = (newEvents: EventItem[]) => {
    try {
      const sortedEvents = [...newEvents].sort((a, b) => a.time.localeCompare(b.time));
      setEvents(sortedEvents);
      window.localStorage.setItem(EVENTS_KEY, JSON.stringify(sortedEvents));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  };

  return { events, saveEvents };
};