import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";

dotenv.config();

const app = express();
const port = 5000;
const client = new MongoClient(process.env.MONGO_URI);

let db;
async function connectDB() {
  await client.connect();
  db = client.db("JobTracker");
  console.log("✅ Connected to MongoDB Atlas");
}

app.use(cors());
app.use(express.json());

/**
 * POST /jobs
 * Add a new job
 */
app.post("/jobs", async (req, res) => {
  try {
    const job = req.body;
    if (!job.company || !job.role || !job.status || !job.date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await db.collection("applications").insertOne(job);
    const inserted = await db
      .collection("applications")
      .findOne({ _id: result.insertedId });

    res.status(201).json(inserted);
  } catch (err) {
    console.error("Error inserting job:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * GET /jobs
 * Fetch all jobs
 */
app.get("/jobs", async (req, res) => {
  try {
    const jobs = await db.collection("applications").find().toArray();
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

import { ObjectId } from 'mongodb';

/**
 * GET /jobs/:id
 * Fetch a single job by ID
 */
app.get("/jobs/:id", async (req, res) => {
  try {
    const job = await db
      .collection("applications")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).json({ error: "Invalid job ID" });
  }
});

/**
 * PATCH /jobs/:id
 * Update an existing job
 */
app.patch("/jobs/:id", async (req, res) => {
  try {
    const updatedFields = req.body;

    const result = await db
      .collection("applications")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: updatedFields }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    const updatedJob = await db
      .collection("applications")
      .findOne({ _id: new ObjectId(req.params.id) });

    res.json(updatedJob);
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ error: "Invalid job ID or update failed" });
  }
});

/**
 * DELETE /jobs/:id
 * Remove a job from the database
 */
app.delete("/jobs/:id", async (req, res) => {
  try {
    const result = await db
      .collection("applications")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ error: "Invalid job ID or deletion failed" });
  }
});



app.listen(port, async () => {
  await connectDB();
  console.log(`🚀 Backend listening on http://localhost:${port}`);
});
