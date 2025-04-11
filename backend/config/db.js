import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

export const connectToDB = async () => {
  try {
    await client.connect();
    db = client.db("JobTracker");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
};

export const getDB = () => db;
