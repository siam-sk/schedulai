import type { Event } from '../App';
import EventItem from './EventItem';

interface EventListProps {
  events: Event[];
  onDeleteEvent: (id: number) => void;
  onArchiveEvent: (id: number) => void;
}

const EventList = ({ events, onDeleteEvent, onArchiveEvent }: EventListProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center text-gray-500 py-16 px-4 border-2 border-dashed border-gray-800 rounded-lg">
        <h3 className="text-lg font-medium text-white">No Events Yet</h3>
        <p className="mt-1">Add a new event to see it here.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {events.map(event => (
        <EventItem key={event.id} event={event} onDelete={onDeleteEvent} onArchive={onArchiveEvent} />
      ))}
    </ul>
  );
};

export default EventList;