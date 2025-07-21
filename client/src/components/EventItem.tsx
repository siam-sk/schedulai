import type { Event } from '../App';
import { format } from 'date-fns';

interface EventItemProps {
  event: Event;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
}

const EventItem = ({ event, onDelete, onArchive }: EventItemProps) => {
  
  const categoryStyles = {
    Work: 'border-indigo-500 text-indigo-400',
    Personal: 'border-green-500 text-green-400',
    Other: 'border-gray-600 text-gray-500',
  };

  
  const eventDateTime = new Date(`${event.date}T${event.time}`);

  return (
    <li
      className={`
        bg-gray-900 border border-gray-800 p-5 rounded-lg transition-all duration-300
        ${event.archived ? 'bg-gray-950 text-gray-600' : 'hover:border-gray-700'}
      `}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-grow">
          <h3 className={`font-semibold text-lg text-white ${event.archived ? 'line-through' : ''}`}>
            {event.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            
            {format(eventDateTime, "dd/MM/yyyy 'at' h:mm a")}
          </p>
          {event.notes && (
            <p className="text-gray-400 mt-3 bg-black p-3 rounded-md text-sm border border-gray-800">
              {event.notes}
            </p>
          )}
        </div>
        <span className={`text-xs font-medium px-3 py-1 rounded-full border whitespace-nowrap ${categoryStyles[event.category]}`}>
          {event.category}
        </span>
      </div>
      <div className="mt-4 flex gap-2 justify-end">
        {!event.archived && (
          <button
            onClick={() => onArchive(event.id)}
            className="text-xs font-semibold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-md transition-colors"
          >
            Archive
          </button>
        )}
        <button
          onClick={() => onDelete(event.id)}
          className="text-xs font-semibold text-red-400 hover:text-white bg-red-900/50 hover:bg-red-800/80 px-3 py-1 rounded-md transition-colors"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default EventItem;