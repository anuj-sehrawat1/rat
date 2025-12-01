import express from "express";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update, remove, get, child } from "firebase/database";

dotenv.config();
const app = express();
app.use(express.json());

// --- FIREBASE INIT ---
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_ID,
  appId: process.env.APP_ID,
};

const fb = initializeApp(firebaseConfig);
const db = getDatabase(fb);

// ---------------------- ROUTES ----------------------

// CREATE / ADD DATA
app.post("/add", async (req, res) => {
  const { path, data } = req.body;
  if (!path) return res.status(400).json({ error: "path missing" });

  await set(ref(db, path), data);
  return res.json({ success: true });
});

// UPDATE DATA
app.post("/update", async (req, res) => {
  const { path, data } = req.body;
  if (!path) return res.status(400).json({ error: "path missing" });

  await update(ref(db, path), data);
  return res.json({ success: true });
});

// DELETE DATA
app.post("/delete", async (req, res) => {
  const { path } = req.body;
  if (!path) return res.status(400).json({ error: "path missing" });

  await remove(ref(db, path));
  return res.json({ success: true });
});

// GET DATA
app.get("/get", async (req, res) => {
  const { path } = req.query;
  if (!path) return res.status(400).json({ error: "path missing" });

  const snapshot = await get(child(ref(db), path));
  return res.json(snapshot.exists() ? snapshot.val() : {});
});

// -----------------------------------------------------

app.listen(3000, () => console.log("API running on 3000"));
