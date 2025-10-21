import { useState } from 'react';
import { BoardSettings } from '../types';

const SETTINGS_KEY = 'synagogueBoardSettings';

const defaultSettings: BoardSettings = {
  scale: 1,
};

export const useBoardSettings = () => {
  const [settings, setSettings] = useState<BoardSettings>(() => {
    try {
      const storedSettings = window.localStorage.getItem(SETTINGS_KEY);
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        // Basic validation
        if (typeof parsed.scale === 'number') {
          return { ...defaultSettings, ...parsed };
        }
      }
      return defaultSettings;
    } catch (error) {
      console.error('Error reading settings from localStorage', error);
      return defaultSettings;
    }
  });

  const saveSettings = (newSettings: BoardSettings) => {
    try {
      setSettings(newSettings);
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error writing settings to localStorage', error);
    }
  };

  return { settings, saveSettings };
};
