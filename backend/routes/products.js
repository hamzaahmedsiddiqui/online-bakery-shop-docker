const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { authenticateToken } = require("../middleware/auth");

// Get all products
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//create new product (admin only)
router.post("/", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const {
    name,
    description,
    price,
    calories,
    protein,
    category,
    is_featured,
    image_url,
  } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO products (name, description, price, calories, protein, category, is_featured, image_url)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `,
      [name, description, price, calories, protein, category, is_featured, image_url]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update Product
router.put("/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const id = req.params.id;
  const {
    description,
    price,
    calories,
    protein,
    category,
    is_featured,
    image_url,
  } = req.body;
  
  try {
    const result = await pool.query(
      `
      UPDATE products
      SET name=$1, description=$2, price=$3, calories=$4, protein=$5,
          category=$6, is_featured=$7, image_url=$8
      WHERE id=$9
      RETURNING *
      `,
      [name, description, price, calories, protein, category, is_featured, image_url, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


//  Delete Product
router.delete("/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  try {
    await pool.query("DELETE FROM products WHERE id=$1", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;