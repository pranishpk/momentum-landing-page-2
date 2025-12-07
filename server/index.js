import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Contact from './models/Contact.js';
import Proposal from './models/Proposal.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

// Routes

// Contact Form Route
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Proposal Form Route
app.post('/api/proposal', async (req, res) => {
    try {
        const { name, email, website, budget, goal } = req.body;
        const newProposal = new Proposal({ name, email, website, budget, goal });
        await newProposal.save();
        res.status(201).json({ message: 'Proposal request sent successfully!' });
    } catch (error) {
        console.error('Error saving proposal:', error);
        res.status(500).json({ error: 'Failed to send proposal request' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
