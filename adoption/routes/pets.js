const express = require("express");
const router = express.Router();
const authenticate = require("./middleware/authentication")


//Add a Pet
router.post('/addpet', authenticate, (req, res) => {
    const { animal_type, name, weight, size, gender, activity, good_with, neutered, has_especial_needs, potty_trained, img_url, description, status, current_owner_id, adopter_id } = req.body;
    
    res.send({ message: 'New pet added' });
  });


//Get All Pets
router.get('/all', authenticate, (req, res) => {

    res.send({ message: 'All pets data' });
  });


//Get Pet by ID 
router.get('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    res.send({ message: `Pet data for ID: ${id}` });
  });


//Update Pet Information
router.put('/update/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const { animal_type, name, weight, size, gender, activity, good_with, neutered, has_especial_needs, potty_trained, img_url, description, status, current_owner_id, adopter_id } = req.body;
  
    res.send({ message: `Pet data updated for ID: ${id}` });
  });


//Delete a Pet
router.delete('/delete/:id', authenticate, (req, res) => {
    const { id } = req.params;

    res.send({ message: `Pet with ID: ${id} deleted` });
  });

//Send an Adoption Request

//Accept or Deny Adoption Request

module.exports = router;
