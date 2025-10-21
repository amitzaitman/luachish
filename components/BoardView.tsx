import React from 'react';
import { EventItem, HebrewDateInfo, BoardSettings } from '../types';
import Clock from './Clock';
import HebrewDate from './HebrewDate';

interface BoardViewProps {
  events: EventItem[];
  settings: BoardSettings;
  saveSettings: (settings: BoardSettings) => void;
  onSwitchToAdmin: () => void;
  hebrewDateInfo: HebrewDateInfo | null;
  hebrewDateLoading: boolean;
  hebrewDateError: string | null;
}

interface EventRowProps {
    event: EventItem;
    isLast: boolean;
}

const EventRow: React.FC<EventRowProps> = ({ event, isLast }) => (
    <>
        <div className="py-[0.6em]">
            <div className="flex items-baseline justify-between">
                <h3 className={`text-[1.8em] leading-normal font-title ${event.type === 'prayer' ? 'text-amber-900' : 'text-teal-800'}`}>
                    {event.name}
                </h3>
                <p className={`text-[2em] leading-normal font-mono tracking-wider ${event.type === 'prayer' ? 'text-amber-900' : 'text-teal-800'}`}>
                    {event.time}
                </p>
            </div>
            {event.note && (
                <p className="text-[1.1em] leading-normal text-stone-600 mt-[0.2em] text-center w-full">{event.note}</p>
            )}
        </div>
        {!isLast && <div className="h-[1px] bg-gradient-to-r from-amber-600/5 via-amber-600/20 to-amber-600/5" />}
    </>
);


const BoardView: React.FC<BoardViewProps> = ({ events, settings, saveSettings, onSwitchToAdmin, hebrewDateInfo, hebrewDateLoading, hebrewDateError }) => {
  const eveningEvents = events
    .filter(e => e.dayCategory === 'evening')
    .sort((a, b) => a.time.localeCompare(b.time));

  const dayEvents = events
    .filter(e => e.dayCategory === 'day')
    .sort((a, b) => a.time.localeCompare(b.time));

  const hasShabbatEvents = eveningEvents.length > 0 || dayEvents.length > 0;

  const handleScaleChange = (delta: number) => {
    const newScale = Math.max(0.5, Math.min(2.0, settings.scale + delta));
    saveSettings({ scale: newScale });
  };

  return (
    <div 
      className="relative parchment-texture bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 w-full h-full flex flex-col border border-slate-200"
    >
      <header className="flex justify-between items-center flex-shrink-0">
        <div className="flex-1 text-right">
          <HebrewDate 
            hebrewDateInfo={hebrewDateInfo}
            loading={hebrewDateLoading}
            error={hebrewDateError}
          />
        </div>
        <div className="flex-1 text-center px-4">
            <h2 
              className="text-[4em] leading-normal font-title text-amber-800 whitespace-nowrap"
              style={{ textShadow: '1px 1px 3px rgba(100, 80, 0, 0.15)' }}
            >
              בית הכנסת – גבעת החי"ש
            </h2>
        </div>
        <div className="flex-1 text-left">
            <Clock />
        </div>
      </header>
      
      <div className="h-[2px] bg-gradient-to-r from-amber-600/5 via-amber-600/20 to-amber-600/5" />

      <main 
        className="flex-grow flex flex-col overflow-hidden pt-4 transition-all duration-300"
        style={{ fontSize: `${settings.scale * 100}%` }}
      >
        {hasShabbatEvents ? (
          <div className="w-full max-w-7xl mx-auto grid grid-cols-2 gap-x-24 px-4 flex-grow">
            {/* Column 1: Erev Shabbat (Right side for RTL) */}
            <div className="flex flex-col">
                <h3 
                  className="text-[2.2em] leading-normal font-title font-bold text-amber-900 text-center"
                  style={{ textShadow: '1px 1px 2px rgba(100, 80, 0, 0.1)' }}
                >
                  ערב שבת
                </h3>
                <div className="mt-1 mb-3 h-[2px] bg-gradient-to-r from-amber-600/15 via-amber-600/40 to-amber-600/15"></div>
                {eveningEvents.map((event, index) => <EventRow key={event.id} event={event} isLast={index === eveningEvents.length - 1}/>)}
            </div>
            
            {/* Column 2: Shabbat Day */}
            <div className="flex flex-col">
              <h3 
                className="text-[2.2em] leading-normal font-title font-bold text-amber-900 text-center"
                style={{ textShadow: '1px 1px 2px rgba(100, 80, 0, 0.1)' }}
              >
                יום השבת
              </h3>
               <div className="mt-1 mb-3 h-[2px] bg-gradient-to-r from-amber-600/15 via-amber-600/40 to-amber-600/15"></div>
              {dayEvents.map((event, index) => <EventRow key={event.id} event={event} isLast={index === dayEvents.length - 1} />)}
            </div>
          </div>
        ) : (
             <div className="flex items-center justify-center h-full">
                <p className="text-2xl text-stone-500">לא הוגדרו זמני שבת. לחץ על גלגל השיניים להוספה.</p>
            </div>
        )}
      </main>
      
      <footer className="mt-auto pt-4 text-center flex-shrink-0">
        <div className="absolute top-4 left-16 flex items-center gap-2">
            <button onClick={() => handleScaleChange(-0.05)} className="text-stone-500 hover:text-amber-600 transition-colors p-1 rounded-full hover:bg-stone-200/80" aria-label="הקטן טקסט">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                </svg>
            </button>
            <button onClick={() => handleScaleChange(0.05)} className="text-stone-500 hover:text-amber-600 transition-colors p-1 rounded-full hover:bg-stone-200/80" aria-label="הגדל טקסט">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>

        <button 
          onClick={onSwitchToAdmin} 
          className="absolute top-4 left-4 text-stone-500 hover:text-amber-600 transition-colors"
          aria-label="הגדרות"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </footer>
    </div>
  );
};

export default BoardView;