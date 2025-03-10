const express = require("express");
const router = express.Router();
const authenticate = require("./middleware/authentication");
const db = require("../model/helper");


// Add a Pet to Pets and Posts Table
router.post('/addpet', authenticate, async (req, res) => {
  const { animal_type, name, weight, size, gender, activity_level, good_with, neutered, has_especial_needs, potty_trained, img_url, pet_description, owner_id } = req.body;

  try {
 
    const result = await db(
      `INSERT INTO pets (animal_type, name, weight, size, gender, activity_level, good_with, neutered, has_especial_needs, potty_trained, img_url, pet_description, owner_id)
       VALUES ("${animal_type}", "${name}", ${weight}, "${size}", "${gender}", "${activity_level}", "${good_with}", ${neutered}, ${has_especial_needs}, ${potty_trained}, "${img_url}", "${pet_description}", ${owner_id})`
    );

    const pet_id = result.insertId;

    await db(
      `INSERT INTO posts (pet_id, post_owner_id, post_date)
       VALUES (${pet_id}, ${owner_id}, NOW())`
    );

    res.send({ message: 'New pet added and posted successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error adding pet and post', error: err.message });
  }
});


// Get All Pets
router.get('/all', authenticate, async (req, res) => {
  try {
    const result = await db('SELECT * FROM pets');
    res.send({ pets: result.data });
  } catch (err) {
    res.status(500).send({ message: "Error fetching pets", error: err.message });
  }
});

//Get Pet With FE Filters
router.get('/pets', authenticate, async (req, res) => {
  const { 
    animal_type, 
    gender, 
    activity_level, 
    good_with, 
    neutered, 
    has_especial_needs, 
    potty_trained, 
    owner_id 
  } = req.query;

  let query = 'SELECT * FROM pets WHERE 1=1';

  const queryParams = [];

  if (animal_type) {
    query += ' AND animal_type = ?';
    queryParams.push(animal_type);
  }

  if (gender) {
    query += ' AND gender = ?';
    queryParams.push(gender);
  }

  if (activity_level) {
    query += ' AND activity_level = ?';
    queryParams.push(activity_level);
  }

  if (good_with) {
    query += ' AND good_with = ?';
    queryParams.push(good_with);
  }

  if (neutered !== undefined) {
    query += ' AND neutered = ?';
    queryParams.push(neutered === 'true' ? 1 : 0);
  }

  if (has_especial_needs !== undefined) {
    query += ' AND has_especial_needs = ?';
    queryParams.push(has_especial_needs === 'true' ? 1 : 0);
  }

  if (potty_trained !== undefined) {
    query += ' AND potty_trained = ?';
    queryParams.push(potty_trained === 'true' ? 1 : 0);
  }

  if (owner_id) {
    query += ' AND owner_id = ?';
    queryParams.push(owner_id);
  }

  try {
    const result = await db(query, queryParams);
    res.send({ pets: result.data });
  } catch (err) {
    res.status(500).send({ message: "Error fetching pets with filters", error: err.message });
  }
});


// Update Pet Information
router.put('/update/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { animal_type, name, weight, size, gender, activity_level, good_with, neutered, has_especial_needs, potty_trained, img_url, pet_description, owner_id } = req.body;

  try {
    const result = await db(
      `UPDATE pets SET animal_type = "${animal_type}", name = "${name}", weight = ${weight}, size = "${size}", gender = "${gender}", activity_level = "${activity_level}", good_with = "${good_with}", neutered = ${neutered}, has_especial_needs = ${has_especial_needs}, potty_trained = ${potty_trained}, img_url = "${img_url}", pet_description = "${pet_description}", owner_id = ${owner_id} WHERE pet_id = ${id}`
    );

    if (result.data.affectedRows > 0) {
      res.send({ message: `Pet data updated for ID: ${id}` });
    } else {
      res.status(404).send({ message: "Pet not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Error updating pet", error: err.message });
  }
});

// Delete a Pet
router.delete('/delete/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db(`DELETE FROM pets WHERE pet_id = ${id}`);
    
    if (result.data.affectedRows > 0) {
      res.send({ message: `Pet with ID: ${id} deleted` });
    } else {
      res.status(404).send({ message: "Pet not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Error deleting pet", error: err.message });
  }
});

module.exports = router;
