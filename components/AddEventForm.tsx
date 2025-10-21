import React from 'react';
import { EventItem, EventType, DayCategory } from '../types';

interface AddEventFormProps {
  newEvent: Omit<EventItem, 'id'>;
  onNewEventChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onAddEvent: (e: React.FormEvent) => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ newEvent, onNewEventChange, onAddEvent }) => {
  return (
    <form onSubmit={onAddEvent} className="mt-4 p-4 bg-stone-100 rounded-lg border-t border-stone-200 flex-shrink-0">
      <h2 className="text-2xl font-title text-amber-700 mb-4">הוספת אירוע חדש</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newEvent.name}
            onChange={onNewEventChange}
            placeholder="שם האירוע (למשל, ערבית)"
            className="bg-white border border-stone-300 rounded-lg p-3 text-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <input
            type="text"
            name="note"
            value={newEvent.note || ''}
            onChange={onNewEventChange}
            placeholder="הערה (אופציונלי)"
            className="bg-white border border-stone-300 rounded-lg p-3 text-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="time"
            name="time"
            value={newEvent.time}
            onChange={onNewEventChange}
            className="bg-white border border-stone-300 rounded-lg p-3 text-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
          <select
            name="type"
            value={newEvent.type}
            onChange={onNewEventChange}
            className="bg-white border border-stone-300 rounded-lg p-3 text-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="prayer">תפילה</option>
            <option value="class">שיעור</option>
          </select>
          <select
            name="dayCategory"
            value={newEvent.dayCategory}
            onChange={onNewEventChange}
            className="bg-white border border-stone-300 rounded-lg p-3 text-lg text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="evening">ערב שבת</option>
            <option value="day">יום שבת</option>
            <option value="weekday">יום חול</option>
          </select>
        </div>
      </div>
      <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
        הוסף אירוע לרשימה
      </button>
    </form>
  );
};

export default AddEventForm;