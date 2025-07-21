import { useState, type FormEvent } from 'react';

type NewEventData = {
  title: string;
  date: string;
  time: string;
  notes?: string;
};

interface AddEventFormProps {
  onAddEvent: (eventData: NewEventData) => void;
  onCancel: () => void;
}

const AddEventForm = ({ onAddEvent, onCancel }: AddEventFormProps) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) {
      
      alert('Please fill in the Title, Date, and Time fields.');
      return;
    }
    onAddEvent({ title, date, time, notes });
    
    setTitle('');
    setDate('');
    setTime('');
    setNotes('');
  };

  return (
    <div className="bg-[#171717] border border-gray-800 p-6 rounded-lg mb-8">
      <h2 className="text-xl font-semibold text-white mb-5">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="e.g., Project Deadline"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-400 mb-1">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white focus:ring-indigo-500 focus:border-indigo-500 transition [color-scheme:dark]"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-400 mb-1">Time</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white focus:ring-indigo-500 focus:border-indigo-500 transition [color-scheme:dark]"
            />
          </div>
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-400 mb-1">Notes (Optional)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-white focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="e.g., Discuss Q3 results"
          />
        </div>
        <div className="text-right flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-white hover:bg-gray-200 cursor-pointer text-black font-bold py-2 px-4 rounded-md transition-colors duration-200"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEventForm;