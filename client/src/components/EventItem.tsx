import type { Event } from '../App';
import { format } from 'date-fns';
import { Archive, Trash2, Clock } from 'lucide-react';

interface EventItemProps {
  event: Event;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
}

const EventItem = ({ event, onDelete, onArchive }: EventItemProps) => {
  const categoryStyles = {
    Work: 'bg-indigo-900/50 text-indigo-300 border border-indigo-700/50',
    Personal: 'bg-green-900/50 text-green-300 border border-green-700/50',
    Other: 'bg-gray-700/50 text-gray-400 border border-gray-600/50',
  };

  const eventDateTime = new Date(`${event.date}T${event.time}`);

  return (
    <li
      className={`
        bg-[#171717] border border-gray-800 rounded-xl
        flex transition-all duration-300 group relative overflow-hidden
        ${event.archived ? 'opacity-60' : 'hover:border-gray-700 hover:scale-[1.02]'}
      `}
    >
      
      <div className="flex flex-col items-center justify-center w-24 p-4 bg-black/20 border-r-2 border-dashed border-gray-800/60">
        <span className="text-3xl font-bold text-white tracking-tighter">
          {format(eventDateTime, 'd')}
        </span>
        <span className="text-sm font-semibold text-gray-400 uppercase">
          {format(eventDateTime, 'MMM')}
        </span>
      </div>

      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex-grow">
          
          <div className="flex justify-between items-start mb-3">
            <h3 className={`font-bold text-lg text-white ${event.archived ? 'line-through' : ''}`}>
              {event.title}
            </h3>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${categoryStyles[event.category]}`}>
              {event.category}
            </span>
          </div>

          
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Clock size={14} />
            <span>{format(eventDateTime, 'h:mm a')}</span>
          </div>

          
          {event.notes && (
            <p className="text-gray-400 text-sm">
              {event.notes}
            </p>
          )}
        </div>

        
        <div className="flex gap-2 justify-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onArchive(event.id)}
            title={event.archived ? 'Unarchive' : 'Archive'}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
          >
            <Archive size={16} />
          </button>
          <button
            onClick={() => onDelete(event.id)}
            title="Delete"
            className="p-2 text-red-500/70 hover:text-red-500 hover:bg-red-900/50 rounded-full transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;