import { google } from 'googleapis';
import { connectDB } from './db.js';
import Contact from './contactSchema.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // 1. Save to MongoDB
        await connectDB();
        await Contact.create({ name, email, message });
        console.log('Saved to MongoDB');

        // 2. Save to Google Sheets (Optional Backup)
        if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SPREADSHEET_ID) {
            try {
                const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
                const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'); // Fix newlines in env var
                const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

                const auth = new google.auth.JWT(
                    clientEmail,
                    null,
                    privateKey,
                    ['https://www.googleapis.com/auth/spreadsheets']
                );

                const sheets = google.sheets({ version: 'v4', auth });

                await sheets.spreadsheets.values.append({
                    spreadsheetId: spreadsheetId,
                    range: 'Sheet1!A:D',
                    valueInputOption: 'USER_ENTERED',
                    requestBody: {
                        values: [
                            [name, email, message, new Date().toISOString()]
                        ],
                    },
                });
                console.log('Saved to Google Sheets');
            } catch (sheetError) {
                console.error('Google Sheets Error:', sheetError.message);
                // Continue even if Sheets fails, as MongoDB succeeded
            }
        }

        return res.status(200).json({ message: 'Message sent successfully' });

    } catch (error) {
        console.error('Server Error:', error.message);
        return res.status(500).json({ error: 'Failed to send message' });
    }
}
