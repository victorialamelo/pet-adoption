const express = require('express');
const bcrypt = require("bcrypt");
const db = require("../model/helper");
const saltRounds = 10;
const router = express.Router();
let savedSearches = [];

// G E T all users =======================
router.get("/", async function (req, res) {
  try {
    const results = await db("SELECT * FROM Users");
    console.log("DATABASE RESULTS:", results); // Debugging
    res.json(results); // Fix .data issue
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Database query failed", details: err });
  }
});

// G E T by user id ==================================
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log("GET request received for user ID:", userId);
  console.log("Request params:", req.params);

  try {
    const query = `SELECT * FROM Users WHERE user_id = ${userId}`;
    console.log("Executing query:", query);

    const result = await db(query);
    console.log("Query Result:", result.data);

    if (result.data) {
      res.status(200).json(result.data[0]);
    } else {
      console.log("No user found with ID:", userId);
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send({ message: 'Error fetching user data', error: err.message });
  }
});

// P U T by user id ==================================
router.put('/:userId', async (req, res) => {

});

// P O S T insert user ==========================
router.post("/", async function (req, res, next) {
  console.log("req.body", req.body);
  const { email, name, password } = req.body;

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }
  if (!name) {
    return res.status(400).send({ message: "Name is required" });
  }
  if (!password) {
    return res.status(400).send({ message: "Password is required" });
  }

  const hash = await bcrypt.hash(password, saltRounds);

  const sql = `INSERT INTO users (email, name, password) VALUES ('${email}', '${name}', '${hash}');`;

  try {
    await db(sql, [name || null]);
    //Return the updated records
    const result = await db(`
            SELECT *
            FROM users
            WHERE email = '${email}'
            ORDER BY id DESC
            LIMIT 1
        `);
    res.status(201).send(result.data[0]);
  } catch (e) {
    console.error("INSERT ERROR FOR NAME", e);
    res.status(500).send({ message: e.message });
  }
});

// POST endpoint to save a new search
router.post('/savedSearches', (req, res) => {
  const { search_name, search_query } = req.body;
  const user_id = req.user.id;

  if (!search_name || !search_query) {
    return res.status(400).json({ message: 'Search name and search query are required' });
  }

  const query = 'INSERT INTO SavedSearches (user_id, search_name, search_query) VALUES (?, ?, ?)';

  db.query(query, [user_id, search_name, search_query], (err, result) => {
    if (err) {
      console.error("Error saving search:", err);
      return res.status(500).json({ message: 'Failed to save search' });
    }

    res.status(201).json({
      id: result.insertId,
      user_id,
      search_name,
      search_query,
    });
  });
});

// Create a saved search - protected route
router.post('/', authenticate, (req, res) => {
  const { search_name, search_query } = req.body;
  const user_id = req.user.id; // get user ID from authenticated session

  if (!search_name || !search_query) {
    return res.status(400).json({ message: 'Search name and search query are required' });
  }

  const query = 'INSERT INTO SavedSearches (user_id, search_name, search_query) VALUES (?, ?, ?)';

  db.query(query, [user_id, search_name, search_query], (err, result) => {
    if (err) {
      console.error("Error saving search:", err);
      return res.status(500).json({ message: 'Failed to save search' });
    }

    res.status(201).json({
      id: result.insertId,
      user_id,
      search_name,
      search_query,
    });
  });
});

// Get all saved searches for a user
router.get('/', authenticate, (req, res) => {
  const user_id = req.user.id;

  const query = 'SELECT * FROM SavedSearches WHERE user_id = ? ORDER BY created_at DESC';

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Error fetching saved searches:", err);
      return res.status(500).json({ message: 'Failed to fetch saved searches' });
    }

    res.json(results);
  });
});

// Delete a saved search
router.delete('/:id', authenticate, (req, res) => {
  const search_id = req.params.id;
  const user_id = req.user.id;

  // ensuring the search belongs to the user
  const query = 'DELETE FROM SavedSearches WHERE search_id = ? AND user_id = ?';

  db.query(query, [search_id, user_id], (err, result) => {
    if (err) {
      console.error("Error deleting saved search:", err);
      return res.status(500).json({ message: 'Failed to delete saved search' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Saved search not found or not authorized' });
    }

    res.json({ message: 'Saved search deleted successfully' });
  });
});

// // D E L E T E =======================================
// router.delete("/:id", async function (req, res, next) {
//   const userID = +req.params.id;

//   try {
//     await db(`DELETE FROM users WHERE id=${userID}`);
//     const result = await db("SELECT * FROM users");
//     res.status(201).send(result.data);
//   } catch (e) {
//     res.status(500).send({ message: e.message });
//   }
// });


module.exports = router;
