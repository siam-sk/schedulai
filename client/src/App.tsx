import { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from './components/EventList';
import logo from './assets/schedulai.svg'; 


export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: 'Work' | 'Personal' | 'Other';
  archived: boolean;
}

const API_URL = 'http://localhost:5001/events';

function App() {
  const [events, setEvents] = useState<Event[]>([]);

  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(API_URL);
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-black min-h-screen font-sans text-gray-300">
      <header className="bg-gray-900/70 border-b border-gray-800 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={logo} alt="SchedulAI Logo" className="h-8 w-8" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                SchedulAI
              </h1>
            </div>
            
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-white mb-5">Upcoming Events</h2>
          <EventList events={events} />
        </div>
      </main>
    </div>
  );
}

export default App;
