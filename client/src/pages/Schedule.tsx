import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

interface Event {
    _id: string;
    title: string;
    start: string;
    end: string;
    description?: string;
}

const Schedule = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '', description: '' });

    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday start
    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        try {
            const { data } = await axios.get('http://localhost:5000/api/events', {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            setEvents(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        try {
            await axios.post('http://localhost:5000/api/events', newEvent, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            setNewEvent({ title: '', start: '', end: '', description: '' });
            fetchEvents();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCopyWeek = async () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        if (!window.confirm('Copy events from previous week to this week?')) return;

        try {
            await axios.post('http://localhost:5000/api/events/copy-week', {
                targetDate: currentDate,
            }, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            fetchEvents();
            alert('Events copied!');
        } catch (error) {
            console.error(error);
            alert('Failed to copy events');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Weekly Schedule</h1>
                <div className="flex gap-2">
                    <button onClick={() => setCurrentDate(addDays(currentDate, -7))} className="rounded border px-3 py-1">&lt; Prev</button>
                    <span className="font-bold">{format(startDate, 'MMM d')} - {format(addDays(startDate, 6), 'MMM d')}</span>
                    <button onClick={() => setCurrentDate(addDays(currentDate, 7))} className="rounded border px-3 py-1">Next &gt;</button>
                </div>
                <button onClick={handleCopyWeek} className="rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600">
                    Copy Previous Week
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day) => (
                    <div key={day.toString()} className="min-h-[200px] rounded border bg-white p-2 shadow-sm">
                        <div className="mb-2 border-b pb-1 font-bold text-center">{format(day, 'EEE d')}</div>
                        <div className="space-y-2">
                            {events
                                .filter((event) => isSameDay(new Date(event.start), day))
                                .map((event) => (
                                    <div key={event._id} className="rounded bg-blue-100 p-1 text-sm">
                                        <div className="font-bold">{event.title}</div>
                                        <div className="text-xs text-gray-600">
                                            {format(new Date(event.start), 'HH:mm')} - {format(new Date(event.end), 'HH:mm')}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 rounded border bg-gray-50 p-4">
                <h2 className="mb-4 text-xl font-bold">Add Event</h2>
                <form onSubmit={handleCreateEvent} className="flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="rounded border p-2"
                        required
                    />
                    <input
                        type="datetime-local"
                        value={newEvent.start}
                        onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                        className="rounded border p-2"
                        required
                    />
                    <input
                        type="datetime-local"
                        value={newEvent.end}
                        onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                        className="rounded border p-2"
                        required
                    />
                    <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Add</button>
                </form>
            </div>
        </div>
    );
};

export default Schedule;
