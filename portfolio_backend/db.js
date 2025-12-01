// db.js (ES Modules) - clean and correct
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL;

if (!MONGO_URI) {
  console.error('❌ ERROR: MONGO_URI is missing in .env');
}

let isConnected = false;

export async function connectDB({ retries = 5, retryDelayMs = 2000 } = {}) {
  console.log("→ Connecting to MongoDB...");

  if (isConnected && mongoose.connection.readyState === 1) {
    console.log("✔ Already connected to MongoDB");
    return mongoose.connection;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(MONGO_URI);  // no deprecated options

      isConnected = true;
      console.log("✔ MongoDB connected");

      mongoose.connection.on("disconnected", () => {
        console.warn("⚠ MongoDB disconnected");
        isConnected = false;
      });

      mongoose.connection.on("reconnected", () => {
        console.log("🔄 MongoDB reconnected");
        isConnected = true;
      });

      return mongoose.connection;
    } catch (err) {
      console.error(`❌ MongoDB connection attempt ${attempt} failed:`, err.message);

      if (attempt === retries) throw err;

      await new Promise(res => setTimeout(res, retryDelayMs));
    }
  }
}

export function getMongoose() {
  return mongoose;
}
