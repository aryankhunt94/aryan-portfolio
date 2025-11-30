import { google } from 'googleapis';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Google Sheets Auth using Environment Variables
        const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'); // Fix newlines in env var
        const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

        if (!clientEmail || !privateKey || !spreadsheetId) {
            console.error('Missing environment variables for Google Sheets');
            return res.status(500).json({ error: 'Server configuration error' });
        }

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

        return res.status(200).json({ message: 'Message sent successfully' });

    } catch (error) {
        console.error('Google Sheets Error:', error.message);
        return res.status(500).json({ error: 'Failed to send message' });
    }
}
