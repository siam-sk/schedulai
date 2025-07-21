import { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from './components/EventList';
import logo from './assets/schedulai.svg';
import AddEventForm from './components/AddEventForm';


export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: 'Work' | 'Personal' | 'Other';
  archived: boolean;
}

type Category = 'Work' | 'Personal' | 'Other';
type FilterCategory = 'All' | Category;

type NewEventData = Omit<Event, 'id' | 'category' | 'archived'>;

const API_URL = 'http://localhost:5001/events';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<FilterCategory>('All');

  const fetchEvents = async () => {
    try {
      const response = await axios.get(API_URL);
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };
  
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async (eventData: NewEventData) => {
    try {
      await axios.post(API_URL, eventData);
      fetchEvents(); 
    } catch (error) {
      console.error("Failed to add event:", error);
      
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEvents(); 
    } catch (error) {
      console.error(`Failed to delete event ${id}:`, error);
    }
  };

  const handleArchiveEvent = async (id: number) => {
    try {
      await axios.put(`${API_URL}/${id}`);
      fetchEvents();
    } catch (error) {
      console.error(`Failed to archive event ${id}:`, error);
    }
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'All') return true;
    return event.category === filter;
  });

  const filterCategories: FilterCategory[] = ['All', 'Work', 'Personal', 'Other'];

  return (
    <div className="bg-black min-h-screen font-sans text-gray-300">
      <header className="bg-gray-900/70 border-b border-gray-800 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={logo} alt="SchedulAI Logo" className="h-8 w-8" />
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                SchedulAI
              </h1>
            </div>
            
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        
        <AddEventForm onAddEvent={handleAddEvent} />

        <div className="mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-4">
            <h2 className="text-xl font-semibold text-white">Upcoming Events</h2>
            <div className="flex items-center justify-center gap-1 border border-gray-800 rounded-full p-1 bg-gray-900">
              {filterCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                    filter === category
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <EventList events={filteredEvents} onDeleteEvent={handleDeleteEvent} onArchiveEvent={handleArchiveEvent} />
        </div>
      </main>
    </div>
  );
}

export default App;
