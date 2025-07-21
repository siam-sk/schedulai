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


let events: Event[] = [];
let currentId = 1;

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

  const newEvent: Event = {
    id: currentId++,
    title,
    date,
    time,
    notes,
    category: 'Other',
    archived: false,
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.get('/', (req: Request, res: Response) => {
  res.send('SchedulAI Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});