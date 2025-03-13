const express = require('express');
const bcrypt = require("bcrypt");
const db = require("../model/helper");
const saltRounds = 10;
const router = express.Router();

// G E T all users =======================
router.get("/", async function (req, res) {
  try {
    const results = await db("SELECT * FROM users");
    console.log("DATABASE RESULTS:", results); // Debugging
    res.json(results); // Fix .data issue
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: "Database query failed", details: err });
  }
});

// G E T by  user id ==================================
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await db(`
            SELECT * FROM users WHERE user_id = ${userId}
        `);

    if (result.data.length) {
      res.status(200).send(result.data[0]);
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ message: 'Error fetching user data', error: err.message });
  }
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

// D E L E T E =======================================
router.delete("/:id", async function (req, res, next) {
  const userID = +req.params.id;

  try {
    await db(`DELETE FROM users WHERE id=${userID}`);
    const result = await db("SELECT * FROM users");
    res.status(201).send(result.data);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});


module.exports = router;
