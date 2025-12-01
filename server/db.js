// import sqlite3 from 'sqlite3';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Use verbose mode for better debugging
// const sqlite3Verbose = sqlite3.verbose();

// const dbPath = join(__dirname, 'database.sqlite');

// const db = new sqlite3Verbose.Database(dbPath, (err) => {
//     if (err) {
//         console.error('Error opening database ' + dbPath + ': ' + err.message);
//     } else {
//         console.log('Connected to the SQLite database.');
//         initDb();
//     }
// });

// function initDb() {
//     db.serialize(() => {
//         // Create Contacts table
//         db.run(`CREATE TABLE IF NOT EXISTS contacts (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT NOT NULL,
//       email TEXT NOT NULL,
//       message TEXT NOT NULL,
//       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     )`, (err) => {
//             if (err) {
//                 console.error('Error creating contacts table:', err.message);
//             } else {
//                 console.log('Contacts table ready.');
//             }
//         });

//         // Create Projects table
//         db.run(`CREATE TABLE IF NOT EXISTS projects (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       title TEXT NOT NULL,
//       description TEXT,
//       github_url TEXT,
//       demo_url TEXT
//     )`, (err) => {
//             if (err) {
//                 console.error('Error creating projects table:', err.message);
//             } else {
//                 console.log('Projects table ready.');
//             }
//         });
//     });
// }

// export default db;

// db.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Mongoose connection options
const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Other options can be added if needed
};

let isConnected = false;

/**
 * Connect to MongoDB using mongoose.
 * Safe to call multiple times; will reuse existing connection.
 */
export async function connectDB() {
    if (isConnected) {
        // Reuse existing connection
        return mongoose.connection;
    }

    try {
        await mongoose.connect(MONGODB_URI, opts);
        isConnected = true;
        console.log("✔ Connected to MongoDB:", MONGODB_URI);
        attachEventHandlers();
        return mongoose.connection;
    } catch (err) {
        console.error("✖ MongoDB connection error:", err.message);
        throw err;
    }
}

/**
 * Attach simple event handlers for debugging (connected, error, disconnected).
 */
function attachEventHandlers() {
    mongoose.connection.on("connected", () => {
        console.log("Mongoose connected to DB.");
    });

    mongoose.connection.on("error", (err) => {
        console.error("Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
        console.warn("Mongoose disconnected.");
        isConnected = false;
    });

    // Optional: close Mongoose on Node process termination
    process.on("SIGINT", async () => {
        try {
            await mongoose.connection.close();
            console.log("Mongoose connection closed through app termination (SIGINT).");
            process.exit(0);
        } catch (e) {
            console.error("Error while closing mongoose connection on SIGINT:", e);
            process.exit(1);
        }
    });
}

/**
 * Gracefully close the mongoose connection (useful in tests or shutdown flows).
 */
export async function closeDB() {
    if (!isConnected) return;
    await mongoose.connection.close();
    isConnected = false;
    console.log("Mongoose connection closed.");
}

// Export mongoose so you can define schemas elsewhere using `import { mongoose } from './db.js'`
export { mongoose };

// Default export connects immediately (optional). If you prefer manual connect, comment out the line below.
// NOTE: leaving this active will attempt connection as soon as the module is imported.
connectDB().catch(() => {
    // Connection attempt failed — the error is already logged in connectDB.
    // Don't crash the process here; let the caller handle it if desired.
});

export default connectDB;
