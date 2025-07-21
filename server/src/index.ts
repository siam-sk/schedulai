import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
const PORT = process.env.PORT || 5001;


interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  notes?: string;
  category: 'Work' | 'Personal' | 'Other';
  archived: boolean;
}


let events: Event[] = [
  {
    id: 1,
    title: 'Q3 Project Kick-off Meeting',
    date: '2025-07-22',
    time: '10:00',
    notes: 'Finalize the project scope and assign initial tasks.',
    category: 'Work',
    archived: false,
  },
  {
    id: 2,
    title: "Alex's Birthday Party",
    date: '2025-07-26',
    time: '19:00',
    notes: "Don't forget to buy a gift!",
    category: 'Personal',
    archived: false,
  },
  {
    id: 3,
    title: 'Renew Car Insurance',
    date: '2025-07-24',
    time: '14:30',
    notes: 'Check for better quotes online first.',
    category: 'Other',
    archived: false,
  },
  {
    id: 4,
    title: 'Client Presentation Prep',
    date: '2025-08-01',
    time: '11:00',
    notes: 'Review the slides with the design team.',
    category: 'Work',
    archived: false,
  },
  {
    id: 5,
    title: 'Dentist Appointment',
    date: '2025-07-15',
    time: '09:30',
    notes: 'Routine check-up. All good.',
    category: 'Personal',
    archived: true,
  },
  {
    id: 6,
    title: 'Submit Q2 Project Report',
    date: '2025-07-18',
    time: '17:00',
    notes: 'Report submitted to management.',
    category: 'Work',
    archived: true,
  },
];

let currentId = 7; 


const categorizeEvent = (title: string, notes?: string): 'Work' | 'Personal' | 'Other' => {
  const workKeywords = ['meeting', 'project', 'client', 'sprint', 'deadline'];
  const personalKeywords = ['birthday', 'family', 'party', 'doctor', 'gym'];
  const textToSearch = `${title.toLowerCase()} ${notes?.toLowerCase() || ''}`;

  if (workKeywords.some(keyword => textToSearch.includes(keyword))) {
    return 'Work';
  }
  if (personalKeywords.some(keyword => textToSearch.includes(keyword))) {
    return 'Personal';
  }
  return 'Other';
};

app.use(cors());
app.use(express.json());


app.get('/events', (req: Request, res: Response) => {
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });
  res.status(200).json(sortedEvents);
});


app.post('/events', (req: Request, res: Response) => {
  const { title, date, time, notes } = req.body;

  if (!title || !date || !time) {
    return res.status(400).json({ message: 'Title, date, and time are required.' });
  }

  const category = categorizeEvent(title, notes);

  const newEvent: Event = {
    id: currentId++,
    title,
    date,
    time,
    notes,
    category,
    archived: false,
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.put('/events/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const eventIndex = events.findIndex(e => e.id === id);

  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found.' });
  }

  events[eventIndex].archived = !events[eventIndex].archived;
  res.status(200).json(events[eventIndex]);
});


app.delete('/events/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const eventIndex = events.findIndex(e => e.id === id);

  if (eventIndex === -1) {
    return res.status(404).json({ message: 'Event not found.' });
  }

  events.splice(eventIndex, 1);
  res.status(204).send();
});

app.get('/', (req: Request, res: Response) => {
  res.send('SchedulAI Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});