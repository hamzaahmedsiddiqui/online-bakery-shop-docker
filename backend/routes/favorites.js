const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { authenticateToken } = require("../middleware/auth");

// 🔹 Get user's favorites
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT favorites.id, favorites.product_id, products.*
      FROM favorites
      JOIN products ON favorites.product_id = products.id
      WHERE favorites.user_id = $1
      `,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Toggle favorite
router.post("/:productId", authenticateToken, async (req, res) => {
  const productId = Number(req.params.productId);

  try {
    const existing = await pool.query(
      "SELECT * FROM favorites WHERE user_id = $1 AND product_id = $2",
      [req.user.id, productId]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        "DELETE FROM favorites WHERE user_id = $1 AND product_id = $2",
        [req.user.id, productId]
      );
      return res.json({ added: false });
    } else {
      await pool.query(
        "INSERT INTO favorites (user_id, product_id) VALUES ($1, $2)",
        [req.user.id, productId]
      );
      return res.json({ added: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;