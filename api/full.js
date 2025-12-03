import axios from "axios";

export default async function handler(req, res) {
  try {
    const DB = process.env.DATABASE_URL;
    const response = await axios.get(`${DB}/.json`);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
