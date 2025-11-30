import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import db from './db.js';
import fs from 'fs';

const app = express();
const PORT = 3000;

// TODO: REPLACE THIS WITH YOUR ACTUAL SPREADSHEET ID
const SPREADSHEET_ID = '11YPayNtmyUJbnuaBVzHi8H8_85mvhl0TO_-91uNdQHk';

app.use(cors());
app.use(express.json());

// Google Sheets Auth
const auth = new google.auth.GoogleAuth({
    keyFile: 'server/credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

// Contact Route
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // 1. Save to SQLite
    const sql = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;

    db.run(sql, [name, email, message], async function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // 2. Append to Google Sheets
        try {
            if (fs.existsSync('server/credentials.json') && SPREADSHEET_ID !== 'YOUR_SPREADSHEET_ID_HERE') {
                await sheets.spreadsheets.values.append({
                    spreadsheetId: SPREADSHEET_ID,
                    range: 'Sheet1!A:D', // Assumes columns: Name, Email, Message, Date
                    valueInputOption: 'USER_ENTERED',
                    requestBody: {
                        values: [
                            [name, email, message, new Date().toISOString()]
                        ],
                    },
                });
                console.log('Added to Google Sheets');
            } else {
                console.log('Skipping Google Sheets: credentials.json missing or SPREADSHEET_ID not set.');
            }
        } catch (sheetErr) {
            console.error('Google Sheets Error:', sheetErr.message);
            // Don't fail the request if Sheets fails, just log it
        }

        res.json({
            message: 'Message sent successfully',
            id: this.lastID
        });
    });
});

// Get Projects Route (Example of fetching from DB)
app.get('/api/projects', (req, res) => {
    const sql = 'SELECT * FROM projects';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
