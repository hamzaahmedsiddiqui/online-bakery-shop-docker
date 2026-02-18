const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { authenticateToken } = require("../middleware/auth");

// 🔹 Get cart
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT cart_items.id,
             cart_items.product_id,
             cart_items.quantity,
             products.name,
             products.price,
             products.image_url
      FROM cart_items
      JOIN products ON cart_items.product_id = products.id
      WHERE cart_items.user_id = $1
      `,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Add to cart
router.post("/", authenticateToken, async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  try {
    const existing = await pool.query(
      "SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2",
      [req.user.id, productId]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        "UPDATE cart_items SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3",
        [quantity, req.user.id, productId]
      );
    } else {
      await pool.query(
        "INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)",
        [req.user.id, productId, quantity]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Update quantity
router.put("/:productId", authenticateToken, async (req, res) => {
  const productId = Number(req.params.productId);
  const { quantity } = req.body;

  try {
    if (quantity <= 0) {
      await pool.query(
        "DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2",
        [req.user.id, productId]
      );
    } else {
      await pool.query(
        "UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3",
        [quantity, req.user.id, productId]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Remove item
router.delete("/:productId", authenticateToken, async (req, res) => {
  const productId = Number(req.params.productId);

  try {
    await pool.query(
      "DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2",
      [req.user.id, productId]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Clear cart
router.delete("/", authenticateToken, async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM cart_items WHERE user_id = $1",
      [req.user.id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;