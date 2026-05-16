
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

pool.query("SELECT NOW()")
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ Database connection failed:", err.message));


require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Backend connected",
      time: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DB connection failed" });
  }
});

app.use("/api", require("./routes/auth"));

// Product routes
app.use("/api/products", require("./routes/products"));

// Favorites routes
app.use("/api/favorites", require("./routes/favorites"));

// Cart routes
app.use("/api/cart", require("./routes/cart"));

app.get("/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT 1");
    res.status(200).json({
      status: "OK",
      db: "connected"
    });
  } catch (err) {
    console.error("DB ERROR:", err.message);
    res.status(500).json({
      status: "ERROR",
      db: "not connected",
      error: err.message
    });
  }
});

app.listen(process.env.PORT || 5050, () => {
  console.log("Server running on port 5050");
});

