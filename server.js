import axios from "axios";

async function readFullDB() {
  try {
    const DATABASE_URL = "https://parkashbhai-default-rtdb.firebaseio.com/"; // yaha apna url

    const response = await axios.get(`${DATABASE_URL}/.json`);
    console.log("FULL DATABASE:", response.data);
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

readFullDB();
