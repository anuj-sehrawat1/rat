import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const DATABASE_URL = "https://parkashbhai-default-rtdb.firebaseio.com/";

// FULL DB
app.get("/full", async (req, res) => {
  try {
    const response = await axios.get(`${DATABASE_URL}/.json`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("API running on 3000"));
