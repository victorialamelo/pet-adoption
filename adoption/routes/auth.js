const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../model/helper");
const authenticate = require('./middleware/authentication');
require('dotenv').config();

const supersecret = process.env.SUPER_SECRET;
const router = express.Router();
const saltRounds = 10;

// user registration with duplicate email check
router.post("/register", async (req, res) => {
  const { email, password, user_name, usertype, ...otherDetails } = req.body;

  try {
    // check if the email already exists
    const existingUser = await db(`SELECT * FROM Users WHERE email = "${email}"`);
    if (existingUser.data.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, saltRounds);

    let { zipcode, city, date_of_birth, phone, entity_name, entity_website, entity_registration_id } = otherDetails;

    // allow null values for optional fields
    entity_name = entity_name || null;
    entity_website = entity_website || null;
    entity_registration_id = entity_registration_id || null;

    console.log("entity_registration_id", entity_registration_id)
    const result = await db(
      `INSERT INTO Users (
                usertype,
                user_name,
                zipcode,
                city,
                date_of_birth,
                phone,
                entity_name,
                entity_website,
                entity_registration_id,
                email,
                password)
       VALUES ("${usertype}",
               "${user_name}",
               "${zipcode}",
               "${city}",
               "${date_of_birth}",
               "${phone}",
               "${entity_name}",
               "${entity_website}",
               "${entity_registration_id}",
               "${email}",
               "${hash}")`
    );

    const user_id = result.insertId;

    // Fetch the newly created user from the database
    const userQuery = await db(`SELECT usertype, user_id, user_name, email, city, zipcode, date_of_birth, phone, entity_name, entity_website, entity_registration_id FROM Users WHERE user_id = ${user_id}`);
    const newUser = userQuery.data[0];

    const token = jwt.sign(
      { user_id, email },
      supersecret,
      { expiresIn: "1h" }
    );

    res.json({
      message: "User registration successful",
      token,
      user: newUser // Return the full user object
    });

  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// edit profile details
// update user profile
router.put("/:user_id", authenticate, async (req, res) => {
  // Only allow users to update their own profile
  if (req.user.user_id != req.params.user_id) {
    return res.status(403).json({ error: "Not authorized to update this profile" });
  }

  const { email, user_name, ...otherDetails } = req.body;
  try {
    // Check if the email is being changed and if it already exists
    if (email && email !== req.user.email) {
      const existingUser = await db(`SELECT * FROM Users WHERE email = "${email}" AND user_id != ${req.params.user_id}`);
      if (existingUser.data.length > 0) {
        return res.status(400).json({ error: "Email already registered" });
      }
    }

    let { zipcode, city, date_of_birth, phone, entity_name, entity_website, entity_registration_id } = otherDetails;

    // Build the update query dynamically based on which fields are provided
    let updateFields = [];

    if (user_name) updateFields.push(`user_name = "${user_name}"`);
    if (email) updateFields.push(`email = "${email}"`);
    if (zipcode) updateFields.push(`zipcode = "${zipcode}"`);
    if (city) updateFields.push(`city = "${city}"`);
    if (date_of_birth) updateFields.push(`date_of_birth = "${date_of_birth}"`);
    if (phone) updateFields.push(`phone = "${phone}"`);

    // Handle entity fields that can be null
    if (entity_name !== undefined) updateFields.push(`entity_name = ${entity_name ? `"${entity_name}"` : 'NULL'}`);
    if (entity_website !== undefined) updateFields.push(`entity_website = ${entity_website ? `"${entity_website}"` : 'NULL'}`);
    if (entity_registration_id !== undefined) updateFields.push(`entity_registration_id = ${entity_registration_id ? `"${entity_registration_id}"` : 'NULL'}`);

    // If no fields to update, return early
    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    // Execute the update query
    await db(`UPDATE Users SET ${updateFields.join(', ')} WHERE user_id = ${req.params.user_id}`);

    // Fetch the updated user from the database
    const userQuery = await db(`SELECT user_id, user_name, email, city, zipcode, date_of_birth, phone, entity_name, entity_website, entity_registration_id FROM Users WHERE user_id = ${req.params.user_id}`);
    const updatedUser = userQuery.data[0];

    res.json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// User Login WORKING
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db(
      `SELECT *
       FROM Users WHERE email = "${email}"`
    );

    const user = result.data[0];

    if (user) {
      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      const user_id = user.user_id;
      let userDetails = { ...user };

      var token = jwt.sign({ user_id }, supersecret, { expiresIn: "1h" });

      res.send({
        message: "Login successful, here is your token",
        token,
        user: userDetails,
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
