import express from 'express';
import Event from '../models/Event';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// @desc    Get all events
// @route   GET /api/events
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create an event
// @route   POST /api/events
// @access  Private
router.post('/', protect, async (req: any, res) => {
    try {
        const { title, start, end, description } = req.body;

        const event = new Event({
            user: req.user._id,
            title,
            start,
            end,
            description,
        });

        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(400).json({ message: 'Invalid event data' });
    }
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            await event.deleteOne();
            res.json({ message: 'Event removed' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Copy events from previous week
// @route   POST /api/events/copy-week
// @access  Private
router.post('/copy-week', protect, async (req: any, res) => {
    try {
        const { targetDate } = req.body; // Date in the target week
        const target = new Date(targetDate);

        // Calculate start of target week (assuming Sunday start)
        const targetStart = new Date(target);
        targetStart.setDate(target.getDate() - target.getDay());
        targetStart.setHours(0, 0, 0, 0);

        // Calculate start of previous week
        const prevStart = new Date(targetStart);
        prevStart.setDate(prevStart.getDate() - 7);

        const prevEnd = new Date(targetStart); // End of prev week is start of target week

        // Find events in previous week
        const eventsToCopy = await Event.find({
            start: { $gte: prevStart, $lt: prevEnd }
        });

        if (eventsToCopy.length === 0) {
            return res.status(404).json({ message: 'No events found in previous week' });
        }

        // Create new events shifted by 7 days
        const newEvents = eventsToCopy.map(event => {
            const newStart = new Date(event.start);
            newStart.setDate(newStart.getDate() + 7);

            const newEnd = new Date(event.end);
            newEnd.setDate(newEnd.getDate() + 7);

            return {
                user: req.user._id,
                title: event.title,
                description: event.description,
                start: newStart,
                end: newEnd,
            };
        });

        await Event.insertMany(newEvents);

        res.status(201).json({ message: `Copied ${newEvents.length} events` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
