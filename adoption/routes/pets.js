const express = require("express");
const router = express.Router();
const authenticate = require("./middleware/authentication");
const db = require("../model/helper");

// Add a Pet to Pets and Posts Table
router.post('/addpet', authenticate, async (req, res) => {
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

      // Start a database transaction so they get inserted at the same time
      //const connection = await db.getConnection();
      //await connection.beginTransaction();

      try {
          const insertPetQuery = `
              INSERT INTO Pets (animal_type, name, weight, size, gender, activity_level, good_with, neutered, has_special_needs, potty_trained, img_url, pet_description, user_id)
              VALUES ('${animal_type}', '${name}', ${weight}, '${size}', '${gender}', '${activity_level}', '${good_with}', ${neutered}, ${has_special_needs}, ${potty_trained}, '${img_url}', '${pet_description}', ${user_id})
          `;
          const result = await db(insertPetQuery);
          console.log(result);

         /* const pet_id = result.insertId; // Get the newly inserted pet's ID
          

          const insertPostQuery = `
              INSERT INTO Posts (pet_id, user_id, post_date)
              VALUES (${pet_id}, ${user_id}, NOW())
          `;
          await connection.query(insertPostQuery);

          // Commit transaction if both inserts are successful
          await connection.commit();
          connection.release();

          res.status(201).json({ message: 'Pet added and post created successfully' }); */

      } catch (error) {
          /*await connection.rollback(); // Rollback if anything fails
          connection.release();
          throw error;*/
          console.log(error);
      }

  } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


// Update Pet Information
router.put("/update/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const { 
        animal_type, name, weight, size, gender, activity_level, good_with, 
        neutered, has_special_needs, potty_trained, img_url, pet_description 
    } = req.body;

    const user_id = req.user.user_id;

    try {
        const connection = await db.getConnection();
        try {
            const updateSql = `
                UPDATE Pets 
                SET animal_type = ?, name = ?, weight = ?, size = ?, gender = ?, 
                    activity_level = ?, good_with = ?, neutered = ?, has_special_needs = ?, 
                    potty_trained = ?, img_url = ?, pet_description = ?
                WHERE pet_id = ? AND user_id = ?`;

            const [result] = await connection.execute(updateSql, [
                animal_type, name, weight, size, gender, activity_level, good_with, 
                neutered, has_special_needs, potty_trained, img_url, pet_description, id, user_id
            ]);

            if (result.affectedRows > 0) {
                res.send({ message: `Pet data updated for ID: ${id}` });
            } else {
                res.status(404).send({ message: "Pet not found or you are not authorized to update this pet" });
            }
        } finally {
            connection.release(); // Release connection back to pool
        }
    } catch (err) {
        console.error("Error updating pet:", err);
        res.status(500).send({ message: "Error updating pet", error: err.message });
    }
});

// Delete a Pet
router.delete("/delete/:id", authenticate, async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.user_id;

    try {
        const connection = await db.getConnection();
        try {
            const deleteSql = `DELETE FROM Pets WHERE pet_id = ? AND user_id = ?`;
            const [result] = await connection.execute(deleteSql, [id, user_id]);

            if (result.affectedRows > 0) {
                res.send({ message: `Pet with ID: ${id} deleted` });
            } else {
                res.status(404).send({ message: "Pet not found or you are not authorized to delete this pet" });
            }
        } finally {
            connection.release(); // Release connection back to pool
        }
    } catch (err) {
        console.error("Error deleting pet:", err);
        res.status(500).send({ message: "Error deleting pet", error: err.message });
    }
});

module.exports = router;
