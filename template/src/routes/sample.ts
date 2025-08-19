import express from 'express';
import pool from '../db';

const router = express.Router();

// Sample GET route
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS solution');
        res.json({ message: 'Sample route working!', data: rows });
    } catch (error) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

router.get('/submit', async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT id, name, dob, date_from, date_to, created_at 
            FROM submissions 
            ORDER BY created_at DESC
        `);
        res.json({ success: true, data: rows });
    } catch (error: any) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch data' });
    }
});

// Sample POST route for form submission
router.post('/submit', async (req, res) => {
    console.log('Form submission received:', req.body);
    try {
        const { name, dob, from, to } = req.body;

        const [result] = await pool.execute(
            'INSERT INTO submissions (name, dob, date_from, date_to) VALUES (?, ?, ?, ?)',
            [name, dob, from || null, to || null]
        );

        res.redirect('/?message=Data submitted successfully!');
    } catch (error) {
        res.status(500).json({ error: 'Form submission failed' });
    }
});

export default router;