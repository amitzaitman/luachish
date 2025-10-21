import React from 'react';
import { EventItem, DayCategory } from '../types';

interface EventListItemProps {
  event: EventItem;
  isEditing: boolean;
  editingEventData: EventItem | null;
  onStartEdit: (event: EventItem) => void;
  onCancelEdit: () => void;
  onUpdateEvent: () => void;
  onEditingEventChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onRemoveEvent: (id: string) => void;
}

const categoryLabel = (category: DayCategory) => {
  switch (category) {
    case 'evening': return 'ערב שבת';
    case 'day': return 'יום שבת';
    case 'weekday': return 'יום חול';
  }
};

const EventListItem: React.FC<EventListItemProps> = ({
  event,
  isEditing,
  editingEventData,
  onStartEdit,
  onCancelEdit,
  onUpdateEvent,
  onEditingEventChange,
  onRemoveEvent
}) => {
  if (isEditing && editingEventData) {
    return (
      // Edit Form for the list item
      <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-400 shadow-lg transition-all duration-300">
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input type="text" name="name" value={editingEventData.name} onChange={onEditingEventChange} placeholder="שם האירוע" className="bg-white border border-stone-300 rounded-lg p-2 text-md w-full focus:outline-none focus:ring-1 focus:ring-amber-500" />
            <input type="time" name="time" value={editingEventData.time} onChange={onEditingEventChange} className="bg-white border border-stone-300 rounded-lg p-2 text-md w-full focus:outline-none focus:ring-1 focus:ring-amber-500" />
          </div>
          <input type="text" name="note" value={editingEventData.note || ''} onChange={onEditingEventChange} placeholder="הערה (אופציונלי)" className="bg-white border border-stone-300 rounded-lg p-2 text-md w-full focus:outline-none focus:ring-1 focus:ring-amber-500" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select name="type" value={editingEventData.type} onChange={onEditingEventChange} className="bg-white border border-stone-300 rounded-lg p-2 text-md w-full focus:outline-none focus:ring-1 focus:ring-amber-500">
              <option value="prayer">תפילה</option>
              <option value="class">שיעור</option>
            </select>
            <select name="dayCategory" value={editingEventData.dayCategory} onChange={onEditingEventChange} className="bg-white border border-stone-300 rounded-lg p-2 text-md w-full focus:outline-none focus:ring-1 focus:ring-amber-500">
              <option value="evening">ערב שבת</option>
              <option value="day">יום שבת</option>
              <option value="weekday">יום חול</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onCancelEdit} className="bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold py-1 px-4 rounded-lg transition-colors">ביטול</button>
          <button onClick={onUpdateEvent} className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-1 px-4 rounded-lg transition-colors">שמור</button>
        </div>
      </div>
    );
  }

  return (
    // Display Row
    <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4 flex-wrap">
        <span className={`px-3 py-1 text-sm rounded-full font-semibold ${
          event.dayCategory === 'evening' ? 'bg-indigo-100 text-indigo-800' :
          event.dayCategory === 'day' ? 'bg-amber-100 text-amber-800' :
          'bg-stone-100 text-stone-800'
        }`}>
          {categoryLabel(event.dayCategory)}
        </span>
        <span className={`px-3 py-1 text-sm rounded-full font-semibold ${event.type === 'prayer' ? 'bg-sky-100 text-sky-800' : 'bg-teal-100 text-teal-800'}`}>
          {event.type === 'prayer' ? 'תפילה' : 'שיעור'}
        </span>
        <div>
          <span className="text-lg text-stone-800">{event.name}</span>
          {event.note && <p className="text-sm text-stone-500">{event.note}</p>}
        </div>
        <span className="text-lg font-mono text-stone-500">{event.time}</span>
      </div>
      <div className="flex items-center flex-shrink-0 ml-2">
        <button onClick={() => onStartEdit(event)} className="text-blue-500 hover:text-blue-700 transition-colors p-2" aria-label={`ערוך את ${event.name}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" /></svg>
        </button>
        <button onClick={() => onRemoveEvent(event.id)} className="text-red-500 hover:text-red-700 transition-colors p-2" aria-label={`הסר את ${event.name}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    </div>
  );
};

export default EventListItem;