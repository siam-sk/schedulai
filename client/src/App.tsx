import { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from './components/EventList';
import logo from './assets/logo.png';
import AddEventForm from './components/AddEventForm';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';


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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<FilterCategory>('All');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
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
      await axios.post(`${API_URL}/events`, eventData);
      fetchEvents(); 
      setIsFormVisible(false); 
    } catch (error) {
      console.error("Failed to add event:", error);
      
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/events/${id}`);
      fetchEvents(); 
    } catch (error) {
      console.error(`Failed to delete event ${id}:`, error);
    }
  };

  const handleArchiveEvent = async (id: number) => {
    try {
      await axios.put(`${API_URL}/events/${id}`);
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
      <header className="bg-[#171717] border-b border-gray-800 sticky top-0 z-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={logo} alt="SchedulAI Logo" className="h-8 w-8" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  SchedulAI
                </h1>
                <p className="text-xs text-gray-400 -mt-0.5">Your smart event scheduler</p>
              </div>
            </div>
            
          </div>
        </div>
      </header>
      <main className="container max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        <AnimatePresence>
          {isFormVisible && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <AddEventForm 
                onAddEvent={handleAddEvent} 
                onCancel={() => setIsFormVisible(false)} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-4">
            <h2 className="text-xl font-semibold text-white">Upcoming Events</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center gap-1 border border-gray-800 rounded-full p-1 bg-[#171717]">
                {filterCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                      filter === category
                        ? 'bg-white text-black'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {!isFormVisible && (
                <button 
                  onClick={() => setIsFormVisible(true)}
                  className="hidden sm:flex items-center gap-2 bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-md transition-colors duration-200"
                >
                  <Plus size={18} />
                  New Event
                </button>
              )}
            </div>
          </div>
          <EventList events={filteredEvents} onDeleteEvent={handleDeleteEvent} onArchiveEvent={handleArchiveEvent} />
        </div>
      </main>

      
      {!isFormVisible && (
        <button
          onClick={() => setIsFormVisible(true)}
          className="sm:hidden fixed bottom-6 right-6 bg-white text-black rounded-full p-4 shadow-lg z-20"
          aria-label="Add New Event"
        >
          <Plus size={24} />
        </button>
      )}
    </div>
  );
}

export default App;
