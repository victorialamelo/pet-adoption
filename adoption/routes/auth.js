const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../model/helper");
require('dotenv').config();


const supersecret = process.env.SUPER_SECRET;

const router = express.Router();
const saltRounds = 10;


// User Registration WORKING
router.post("/register", async (req, res) => {
  const { email, password, user_name, ...otherDetails } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    let { zipcode, city, date_of_birth, phone, entity_name, entity_website, entity_registration_id } = otherDetails;

    //Issue: Must accept null values for these fields. FIXED.
    entity_name = entity_name || null;
    entity_website = entity_website || null;
    entity_registration_id = entity_registration_id ? parseInt(entity_registration_id) : null;

    const result = await db(
      `INSERT INTO Users (user_name, zipcode, city,  date_of_birth, phone, entity_name, entity_website, entity_registration_id, email, password) 
       VALUES ("${user_name}", "${zipcode}", "${city}", "${date_of_birth}", "${phone}", 
               ${entity_name ? `"${entity_name}"` : "NULL"}, 
               ${entity_website ? `"${entity_website}"` : "NULL"}, 
               ${entity_registration_id !== null ? entity_registration_id : "NULL"}, 
               "${email}", "${hash}")`
    );

    const user_id = result.insertId;

    const token = jwt.sign(
      { user_id, email },
      supersecret,
      { expiresIn: '1h' }
    );

    res.send({ message: "User registration successful", user_id, token });

  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


// User Login WORKING
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db(
      `SELECT user_id, user_name, email, password, entity_name, entity_website, entity_registration_id, zipcode, city, date_of_birth, phone 
       FROM users WHERE email = "${email}"`
    );

    const user = result.data[0];

    if (user) {
      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      const user_id = user.user_id;
      let userDetails = { ...user };

      var token = jwt.sign({ user_id }, supersecret, {expiresIn: "1h"});

      res.send({
        message: "Login successful, here is your token",
        token,
        user_details: userDetails
      });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// User Logout WORKING
router.post("/logout", (req, res) => {
  res.send({ message: "You have been logged out." });
});

module.exports = router;
