import type { Event } from '../App';

interface EventItemProps {
  event: Event;
  
}

const EventItem = ({ event }: EventItemProps) => {
  
  const categoryStyles = {
    Work: 'border-indigo-500 text-indigo-400',
    Personal: 'border-green-500 text-green-400',
    Other: 'border-gray-600 text-gray-500',
  };

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
            {new Date(`${event.date}T00:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            {' at '}
            {event.time}
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
        
      </div>
    </li>
  );
};

export default EventItem;