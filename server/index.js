// import express from 'express';
// import cors from 'cors';
// import { google } from 'googleapis';
// import db from './db.js';
// import fs from 'fs';

// const app = express();
// const PORT = 3000;

// // TODO: REPLACE THIS WITH YOUR ACTUAL SPREADSHEET ID
// const SPREADSHEET_ID = '11YPayNtmyUJbnuaBVzHi8H8_85mvhl0TO_-91uNdQHk';

// app.use(cors());
// app.use(express.json());

// // Google Sheets Auth
// const auth = new google.auth.GoogleAuth({
//     keyFile: 'server/credentials.json',
//     scopes: ['https://www.googleapis.com/auth/spreadsheets'],
// });

// const sheets = google.sheets({ version: 'v4', auth });

// // Health check
// app.get('/api/health', (req, res) => {
//     res.json({ status: 'ok', message: 'Backend is running' });
// });

// // Contact Route
// app.post('/api/contact', async (req, res) => {
//     const { name, email, message } = req.body;

//     if (!name || !email || !message) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     // 1. Save to SQLite
//     const sql = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;

//     db.run(sql, [name, email, message], async function (err) {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }

//         // 2. Append to Google Sheets
//         try {
//             if (fs.existsSync('server/credentials.json') && SPREADSHEET_ID !== 'YOUR_SPREADSHEET_ID_HERE') {
//                 await sheets.spreadsheets.values.append({
//                     spreadsheetId: SPREADSHEET_ID,
//                     range: 'Sheet1!A:D', // Assumes columns: Name, Email, Message, Date
//                     valueInputOption: 'USER_ENTERED',
//                     requestBody: {
//                         values: [
//                             [name, email, message, new Date().toISOString()]
//                         ],
//                     },
//                 });
//                 console.log('Added to Google Sheets');
//             } else {
//                 console.log('Skipping Google Sheets: credentials.json missing or SPREADSHEET_ID not set.');
//             }
//         } catch (sheetErr) {
//             console.error('Google Sheets Error:', sheetErr.message);
//             // Don't fail the request if Sheets fails, just log it
//         }

//         res.json({
//             message: 'Message sent successfully',
//             id: this.lastID
//         });
//     });
// });

// // Get Projects Route (Example of fetching from DB)
// app.get('/api/projects', (req, res) => {
//     const sql = 'SELECT * FROM projects';
//     db.all(sql, [], (err, rows) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
// index.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { google } from "googleapis";
import db from "./db.js";
import fs from "fs";
import path from "path";


const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual spreadsheet id in .env or set here
const SPREADSHEET_ID = process.env.SPREADSHEET_ID || "11YPayNtmyUJbnuaBVzHi8H8_85mvhl0TO_-91uNdQHk";

// path to credentials.json used for service account
const CREDENTIALS_PATH = process.env.GOOGLE_CREDENTIALS_PATH || path.join("server", "credentials.json");

app.use(cors());
app.use(express.json());

// Setup Google Sheets auth client (lazy - create only if credentials exist)
let sheetsClient = null;
async function getSheetsClient() {
  if (sheetsClient) return sheetsClient;

  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.warn(`Google credentials file not found at ${CREDENTIALS_PATH}. Google Sheets integration disabled.`);
    return null;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: CREDENTIALS_PATH,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // The google.sheets client will use the auth object
    sheetsClient = google.sheets({ version: "v4", auth });
    return sheetsClient;
  } catch (err) {
    console.error("Failed to initialize Google Sheets client:", err.message);
    return null;
  }
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// Utility: promisified run for sqlite3 (so we can await it)
function runSql(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      // resolve with lastID and changes metadata
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

// Contact Route
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 1. Save to SQLite (using promisified helper)
    const sql = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;

    const result = await runSql(db, sql, [name, email, message]);

    // 2. Append to Google Sheets (best-effort — do not fail if sheets fails)
    try {
      const sheets = await getSheetsClient();
      if (sheets && SPREADSHEET_ID && SPREADSHEET_ID !== "YOUR_SPREADSHEET_ID_HERE") {
        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: "Sheet1!A:D", // Assumes columns: Name, Email, Message, Date
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [[name, email, message, new Date().toISOString()]],
          },
        });
        console.log("Added contact to Google Sheets");
      } else {
        console.log("Skipping Google Sheets: client not initialized or SPREADSHEET_ID not set.");
      }
    } catch (sheetErr) {
      console.error("Google Sheets append error:", sheetErr && sheetErr.message ? sheetErr.message : sheetErr);
      // intentionally not failing the main request
    }

    res.json({
      message: "Message sent successfully",
      id: result.lastID,
    });
  } catch (err) {
    console.error("Contact route error:", err.message || err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Projects Route
app.get("/api/projects", (req, res) => {
  const sql = "SELECT * FROM projects";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error fetching projects:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
