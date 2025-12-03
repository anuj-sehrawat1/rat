import axios from "axios";

export default async function handler(req, res) {
  try {
    const DATABASE_URL = process.env.DATABASE_URL;
    const response = await axios.get(`${DATABASE_URL}/.json`);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
