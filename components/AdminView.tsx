import React, { useState } from 'react';
import { EventItem, EventType, DayCategory } from '../types';
import AddEventForm from './AddEventForm';
import EventListItem from './EventListItem';

interface AdminViewProps {
  initialEvents: EventItem[];
  onSave: (newEvents: EventItem[]) => void;
  onSwitchToBoard: () => void;
}

const AdminView: React.FC<AdminViewProps> = ({ initialEvents, onSave, onSwitchToBoard }) => {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [newEvent, setNewEvent] = useState<Omit<EventItem, 'id'>>({ name: '', time: '', type: 'prayer' as EventType, dayCategory: 'day' as DayCategory, note: '' });
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [editingEventData, setEditingEventData] = useState<EventItem | null>(null);

  const handleRemoveEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleNewEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.name && newEvent.time) {
      setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
      setNewEvent({ name: '', time: '', type: 'prayer', dayCategory: 'day', note: '' }); // Reset form
    }
  };

  const handleStartEdit = (event: EventItem) => {
    setEditingEventId(event.id);
    setEditingEventData({ ...event });
  };

  const handleCancelEdit = () => {
    setEditingEventId(null);
    setEditingEventData(null);
  };

  const handleUpdateEvent = () => {
    if (!editingEventData) return;
    setEvents(currentEvents =>
      currentEvents.map(event =>
        event.id === editingEventId ? editingEventData : event
      )
    );
    handleCancelEdit();
  };

  const handleEditingEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingEventData) return;
    const { name, value } = e.target;
    setEditingEventData({ ...editingEventData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(events);
  };
  
  const sortedEvents = [...events].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="bg-stone-50 text-stone-800 rounded-2xl p-8 w-full h-full border border-stone-200 flex flex-col">
      <header className="flex-shrink-0">
        <h1 className="text-4xl font-title text-center text-amber-700 mb-6">הגדרות</h1>
      </header>
      
      <main className="flex-grow flex flex-col overflow-hidden">
        <div className="overflow-y-auto pr-2 flex-grow">
          <h2 className="text-2xl font-title text-amber-700 mb-4 border-b pb-2">רשימת אירועים</h2>
          <div className="space-y-4">
            {sortedEvents.length > 0 ? (
              sortedEvents.map(event => (
                <EventListItem
                  key={event.id}
                  event={event}
                  isEditing={editingEventId === event.id}
                  editingEventData={editingEventData}
                  onStartEdit={handleStartEdit}
                  onCancelEdit={handleCancelEdit}
                  onUpdateEvent={handleUpdateEvent}
                  onEditingEventChange={handleEditingEventChange}
                  onRemoveEvent={handleRemoveEvent}
                />
              ))
            ) : (
              <p className="text-center text-stone-400 py-4">אין אירועים. הוסף אירוע חדש למטה.</p>
            )}
          </div>
        </div>
      </main>

      <AddEventForm 
        newEvent={newEvent}
        onNewEventChange={handleNewEventChange}
        onAddEvent={handleAddEvent}
      />

      <footer className="flex items-center justify-between pt-6 mt-auto border-t border-stone-200 flex-shrink-0">
        <button
          type="button"
          onClick={onSwitchToBoard}
          className="bg-stone-500 hover:bg-stone-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          ביטול
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          שמור שינויים וצא
        </button>
      </footer>
    </div>
  );
};

export default AdminView;