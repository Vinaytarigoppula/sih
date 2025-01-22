// server.js or app.js (Express setup)
import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bcrypt from 'bcrypt';

let nameMine = '';
let coaltype='';
let mineLocation='';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, '../client/build')));

// Initialize SQLite database
let db;
const initDb = async () => {
  db = await open({
    filename: './coal.db',
    driver: sqlite3.Database
  });
};

// Initialize the database and start the server
const startServer = async () => {
  try {
    await initDb();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to initialize database or start server:", error);
  }
};

// Register user
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);
    if (user) {
      console.log("Queried user:", user);
      return res.status(400).json({ message: "Username already taken" });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return res.status(200).json({ message: "User login successful" });
      } else {
        return res.status(400).json({ message: "Password mismatch" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Handle form data submission
app.post("/inputfromuser", async (req, res) => {
  const { mineName, mineType, mineSize, location,coalType, excavationAmount, transport, equipment } = req.body;

  // Validate required fields
  if (!mineName || !mineType || !mineSize || !location || !excavationAmount || !coalType || !equipment) {
    return res.status(400).json({ message: " Fill All The Details." });
  }
  mineLocation=location;
  nameMine = mineName;
  coaltype=coalType;
  if (!Array.isArray(transport) || !Array.isArray(equipment)) {
    return res.status(400).json({ message: "Invalid data format for transport or equipment." });
  }
  try {
    await db.run("INSERT INTO Mines (mine_name, mine_type, mine_size, mine_location) VALUES (?, ?, ?, ?)", [mineName, mineType, mineSize, location]);
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (err) {
    console.error("Error inserting mine data:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/Afforestation", async (req, res) => {
  try {
    console.log(nameMine); // Log mine name for debugging
    const mineLocations = await db.get("SELECT mine_location, mine_type FROM mines WHERE mine_name = ?", [nameMine]);
    
    if (!mineLocations) {
      return res.status(404).json({ message: "Mine not found" });
    }

    console.log("Mine location:", mineLocations.mine_location); // Log mine location to check
    console.log("Coal type:", coaltype);
    console.log("Mining type:", mineLocations.mine_type);

    const area = await db.get("SELECT area_covered_sqm, sequestration_rate FROM ForestData WHERE state = ?", [mineLocations.mine_location]);
    
    const methaneRate = await db.get("SELECT emission_factor FROM MethaneEmissionFactors WHERE coal_type = ? AND mining_type = ?", [coaltype, mineLocations.mine_type]);
    console.log(coaltype);
    const methanEfficiency = await db.all("SELECT capturing_system, efficiency_percentage FROM MethaneEfficiency WHERE coal_type = ? AND mining_type=?", [coaltype,mineLocations.mine_type]);

    console.log("Methane Rate:", methaneRate); // Log methane rate
    console.log("Methane Efficiency:", methanEfficiency); // Log methane efficiency
    
    res.status(200).json({ area, methaneRate, methanEfficiency });
  } catch (error) {
    console.error("Error fetching mine locations:", error);
    res.status(500).json({ message: "Error fetching mine locations" });
  }
});

app.get('/report',async (res,req)=>
{
  const forest=await db.get("SELECT * FROM ForestData where state=? ",mineLocation);
  console.log(forest);
  req.status(200).json({forest});
})

// Catch-all route for React app
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../../client/build/index.html'));
});

// Start the server
startServer();
