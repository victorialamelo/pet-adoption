const express = require("express");
const router = express.Router();
const authenticate = require("./middleware/authentication");
const db = require("../model/helper");

// Add a Pet to Pets and Posts Table
router.post('/pet', authenticate, async (req, res) => {
  try {
      const {
          animal_type, name, weight, size, gender, activity_level,
          good_with, neutered, has_special_needs, potty_trained,
          img_url, pet_description
      } = req.body;

      const user_id = req.user.user_id;

      if (!animal_type || !name || !weight || !size || !gender || !activity_level || !good_with || !img_url || !pet_description) {
          return res.status(400).json({ message: 'Missing required fields' });
      }

      try {
          const insertPetQuery = `
              INSERT INTO Pets (animal_type, name, weight, size, gender, activity_level, good_with, neutered, has_special_needs, potty_trained, img_url, pet_description, user_id)
              VALUES ('${animal_type}', '${name}', ${weight}, '${size}', '${gender}', '${activity_level}', '${good_with}', ${neutered}, ${has_special_needs}, ${potty_trained}, '${img_url}', '${pet_description}', ${user_id})
          `;
          const result = await db(insertPetQuery);
          console.log(result);

        const pet_id = result.insertId; // Get the newly inserted pet's ID
          

          const insertPostQuery = `
              INSERT INTO Posts (pet_id, user_id, post_date)
              VALUES (${pet_id}, ${user_id}, NOW())
          `;
          await db(insertPostQuery);

          res.status(201).json({ message: 'Pet added and post created successfully' });

      } catch (error) {
          console.log(error);
      }

  } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


// Update Pet Information
router.put('/:pet_id', authenticate, async (req, res) => {
  try {
      const { pet_id } = req.params;
      const user_id = req.user.user_id;

      const {
          animal_type, name, weight, size, gender, activity_level,
          good_with, neutered, has_special_needs, potty_trained,
          img_url, pet_description
      } = req.body;

      if (!animal_type || !name || !weight || !size || !gender || !activity_level || !good_with || !img_url || !pet_description) {
          return res.status(400).json({ message: 'Missing required fields' });
      }

      // Check pet ownership
      const checkOwnershipQuery = `SELECT user_id FROM Pets WHERE pet_id = ${pet_id}`;
      const ownershipResult = await db(checkOwnershipQuery);

      // Debugging logs
      console.log("Ownership Query Result:", ownershipResult);
      console.log("Logged-in User ID:", user_id);

      // Fix: Extract data correctly
      if (!ownershipResult || !ownershipResult.data || ownershipResult.data.length === 0) {
          return res.status(404).json({ message: 'Pet not found' });
      }

      console.log("Pet Owner ID:", ownershipResult.data[0].user_id);

      if (ownershipResult.data[0].user_id != user_id) {
          return res.status(403).json({ message: 'Unauthorized to update this pet' });
      }

      // Update pet information
      const updatePetQuery = `
          UPDATE Pets 
          SET animal_type = '${animal_type}', name = '${name}', weight = ${weight}, size = '${size}', 
              gender = '${gender}', activity_level = '${activity_level}', good_with = '${good_with}', 
              neutered = ${neutered}, has_special_needs = ${has_special_needs}, 
              potty_trained = ${potty_trained}, img_url = '${img_url}', pet_description = '${pet_description}' 
          WHERE pet_id = ${pet_id}
      `;

      await db(updatePetQuery);
      res.status(200).json({ message: 'Pet information updated successfully' });

  } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
