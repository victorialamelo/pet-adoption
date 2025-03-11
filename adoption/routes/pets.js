const express = require("express");
const router = express.Router();
const authenticate = require("./middleware/authentication");
const db = require("../model/helper");

// Add a Pet to Pets and Posts Table WORKING
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
                VALUES ('${animal_type}', '${name}', ${weight}, '${size}', '${gender}', '${activity_level}', '${good_with}', ${neutered}, ${has_special_needs}, ${potty_trained}, '${img_url}', '${pet_description}', ${user_id})`;
            const result = await db(insertPetQuery);
            // Debugging
            console.log(result);
  
            const pet_id = result.insertId; // Get the newly inserted pet's ID
            
            const insertPostQuery = `
                INSERT INTO Posts (pet_id, post_owner_id, post_date)
                VALUES (${pet_id}, ${user_id}, NOW())`;
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


// Update Pet Information WORKING
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

      const checkOwnershipQuery = `SELECT user_id FROM Pets WHERE pet_id = ${pet_id}`;
      const ownershipResult = await db(checkOwnershipQuery);

      //Debugging
      console.log("Ownership Query Result:", ownershipResult);
      console.log("Logged-in User ID:", user_id);

      if (!ownershipResult || !ownershipResult.data || ownershipResult.data.length === 0) {
          return res.status(404).json({ message: 'Pet not found' });
      }

      console.log("Pet Owner ID:", ownershipResult.data[0].user_id);

      if (ownershipResult.data[0].user_id != user_id) {
          return res.status(403).json({ message: 'Unauthorized to update this pet' });
      }

      const updatePetQuery = `
          UPDATE Pets 
          SET animal_type = '${animal_type}', name = '${name}', weight = ${weight}, size = '${size}', 
              gender = '${gender}', activity_level = '${activity_level}', good_with = '${good_with}', 
              neutered = ${neutered}, has_special_needs = ${has_special_needs}, 
              potty_trained = ${potty_trained}, img_url = '${img_url}', pet_description = '${pet_description}' 
          WHERE pet_id = ${pet_id}`;

      await db(updatePetQuery);
      res.status(200).json({ message: 'Pet information updated successfully' });

  } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


// Get All Posts WORKING (Logged in users can access)
router.get('/posts', async (req, res) => {
    try {
        const filters = req.query;
        let query = `
            SELECT Posts.post_id, Posts.post_date, Pets.*
            FROM Posts
            JOIN Pets ON Posts.pet_id = Pets.pet_id
            WHERE 1=1`;

        const values = [];

        Object.keys(filters).forEach((key, index) => {
            query += ` AND ${key} = ?`;
            values.push(filters[key]);
        });

        const posts = await db(query, values);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Get Pet By ID WORKING (Logged in users can access, fe filters should work.)
router.get("/:pet_id", async (req, res) => {
    try {
        const petId = req.params.pet_id;

        const query = `
            SELECT Pets.*, Posts.post_id, Posts.post_date 
            FROM Pets
            LEFT JOIN Posts ON Pets.pet_id = Posts.pet_id
            WHERE Pets.pet_id = ${petId}`;

        const result = await db(query);

        if (!result || !result.data || result.data.length === 0) {
            return res.status(404).json({ message: "Pet not found" });
        }

        res.json(result.data[0]);
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
