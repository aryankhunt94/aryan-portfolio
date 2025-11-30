import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use verbose mode for better debugging
const sqlite3Verbose = sqlite3.verbose();

const dbPath = join(__dirname, 'database.sqlite');

const db = new sqlite3Verbose.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + dbPath + ': ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Create Contacts table
        db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
            if (err) {
                console.error('Error creating contacts table:', err.message);
            } else {
                console.log('Contacts table ready.');
            }
        });

        // Create Projects table
        db.run(`CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      github_url TEXT,
      demo_url TEXT
    )`, (err) => {
            if (err) {
                console.error('Error creating projects table:', err.message);
            } else {
                console.log('Projects table ready.');
            }
        });
    });
}

export default db;
