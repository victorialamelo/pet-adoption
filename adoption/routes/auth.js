const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../model/helper");

const supersecret = process.env.SUPER_SECRET;

const router = express.Router();
const saltRounds = 10;

// User Registration
router.post("/register", async (req, res) => {
  const { email, password, user_type, name, ...otherDetails } = req.body;
  if (!user_type || !['currentowner', 'adopter'].includes(user_type)) {
    return res.status(400).send({ message: "User type must be 'currentowner' or 'adopter'" });
  }

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    if (user_type === 'currentowner') {
      const { owner_type, zipcode, city, date_of_birth, phone, website } = otherDetails;

      const result = await db(
        `INSERT INTO CurrentOwner (name, user_type, owner_type, zipcode, city, date_of_birth, phone, website, email, password) 
         VALUES ("${name}", "currentowner", "${owner_type}", "${zipcode}", "${city}", "${date_of_birth}", ${phone}, "${website}", "${email}", "${hash}")`
      );
      
      res.send({ message: "CurrentOwner registration successful" });

    } else if (user_type === 'adopter') {
      const { zipcode, city, date_of_birth, phone, quiz_result } = otherDetails;

      const result = await db(
        `INSERT INTO Adopters (name, user_type, zipcode, city, date_of_birth, phone, quiz_result, email, password) 
         VALUES ("${name}", "adopter", "${zipcode}", "${city}", "${date_of_birth}", ${phone}, "${quiz_result}", "${email}", "${hash}")`
      );

      res.send({ message: "Adopter registration successful" });
    }

  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check both CurrentOwner and Adopters tables for user with given email
    const result = await db(
      `SELECT user_id, name, user_type, email, password, 'currentowner' AS user_type_label 
       FROM CurrentOwner WHERE email = "${email}"
       UNION 
       SELECT user_id, name, user_type, email, password, 'adopter' AS user_type_label 
       FROM Adopters WHERE email = "${email}"`
    );

    const user = result.data[0];

    if (user) {
      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      const user_id = user.user_id;
      let userDetails = { ...user };

      // Generate JWT token
      var token = jwt.sign({ user_id }, supersecret);

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

//User Logout
router.post("/logout", (req, res) => {
  res.send({ message: "You have been logged out." });
});


module.exports = router;