import React, { useState } from 'react';
import { Calendar as CalendarIcon, List, Plus } from 'lucide-react';
import { Calendar } from './components/Calendar';
import { EventModal } from './components/EventModal';
import { EventList } from './components/EventList';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useEvents } from './hooks/useEvents';

function App() {
  const { events, loading, error, createEvent, updateEvent, deleteEvent, refetch } = useEvents();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentView, setCurrentView] = useState('calendar');

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      await createEvent(eventData);
      setIsModalOpen(false);
      setSelectedDate(null);
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  const handleUpdateEvent = async (id, eventData) => {
    try {
      await updateEvent(id, eventData);
      setIsModalOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      setIsModalOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Calendar & Scheduler</h1>
            <p className="text-gray-600">Manage your events and appointments</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => setCurrentView('calendar')}
                className={`px-4 py-2 flex items-center space-x-2 transition-colors ${
                  currentView === 'calendar' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Calendar</span>
              </button>
              <button
                onClick={() => setCurrentView('list')}
                className={`px-4 py-2 flex items-center space-x-2 transition-colors ${
                  currentView === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="w-4 h-4" />
                <span>List</span>
              </button>
            </div>
            <button
              onClick={handleAddEvent}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Add Event</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar/List View */}
          <div className="lg:col-span-2">
            {currentView === 'calendar' ? (
              <Calendar
                events={events}
                onDateClick={handleDateClick}
                onEventClick={handleEventClick}
                onAddEvent={handleAddEvent}
              />
            ) : (
              <EventList
                events={events}
                onEditEvent={handleEventClick}
                onDeleteEvent={handleDeleteEvent}
                title="All Events"
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <EventList
              events={events.filter(event => {
                const today = new Date();
                const eventDate = new Date(event.date);
                return eventDate.toDateString() === today.toDateString();
              })}
              onEditEvent={handleEventClick}
              onDeleteEvent={handleDeleteEvent}
              title="Today's Events"
            />

            {/* Selected Date Events */}
            {selectedDate && (
              <EventList
                events={events.filter(event => {
                  const eventDate = new Date(event.date);
                  return eventDate.toDateString() === selectedDate.toDateString();
                })}
                onEditEvent={handleEventClick}
                onDeleteEvent={handleDeleteEvent}
                title={`Events on ${selectedDate.toLocaleDateString()}`}
              />
            )}
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
          setSelectedDate(null);
        }}
        onSave={handleSaveEvent}
        onUpdate={handleUpdateEvent}
        onDelete={handleDeleteEvent}
        event={selectedEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default App;