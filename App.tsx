import React, { useState } from 'react';
import BoardView from './components/BoardView';
import AdminView from './components/AdminView';
import { useEvents } from './hooks/usePrayerTimes';
import { useHebrewDate } from './hooks/useHebrewDate';
import { useBoardSettings } from './hooks/useBoardSettings';
import { EventItem, BoardSettings } from './types';

const App: React.FC = () => {
  const [isAdminView, setIsAdminView] = useState(false);
  const { events, saveEvents } = useEvents();
  const { hebrewDateInfo, loading, error } = useHebrewDate();
  const { settings, saveSettings } = useBoardSettings();

  const handleSave = (newEvents: EventItem[]) => {
    saveEvents(newEvents);
    setIsAdminView(false);
  };

  return (
    <div className="bg-[#F5F1E9] h-screen overflow-hidden flex items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-screen-2xl">
        <div className="aspect-video bg-white/70 rounded-2xl shadow-[inset_0_6px_12px_rgba(80,50,20,0.12)] backdrop-blur-lg relative">
          {isAdminView ? (
            <AdminView
              initialEvents={events}
              onSave={handleSave}
              onSwitchToBoard={() => setIsAdminView(false)}
            />
          ) : (
            <BoardView
              events={events}
              settings={settings}
              saveSettings={saveSettings}
              onSwitchToAdmin={() => setIsAdminView(true)}
              hebrewDateInfo={hebrewDateInfo}
              hebrewDateLoading={loading}
              hebrewDateError={error}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;