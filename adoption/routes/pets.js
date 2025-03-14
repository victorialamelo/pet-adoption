const express = require("express");
const router = express.Router();
const authenticate = require('./middleware/authentication');
const db = require("../model/helper");
const multer = require("multer");

// Add a Pet to Pets and Posts Table WORKING
router.post('/pet', authenticate, async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        const {
            animal_type, name, weight, size, gender, activity_level,
            good_with_cats, good_with_dogs, good_with_kids, good_with_smallspaces,
            neutered, has_special_needs, potty_trained, pet_description, img_url
        } = req.body;

        const user_id = req.user.user_id;

        if (
            animal_type === undefined ||
            name === undefined ||
            weight === undefined ||
            size === undefined ||
            gender === undefined ||
            activity_level === undefined ||
            potty_trained === undefined ||
            neutered === undefined ||
            pet_description === undefined ||
            has_special_needs === undefined ||
            img_url === undefined ||
            good_with_cats === undefined ||
            good_with_dogs === undefined ||
            good_with_kids === undefined ||
            good_with_smallspaces === undefined ||
            user_id === undefined  // Ensure user_id is included
        ) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        try {
            const insertPetQuery = `
                INSERT INTO Pets
                    (animal_type, name, weight, size, gender, activity_level,
                    good_with_cats, good_with_dogs, good_with_kids, good_with_smallspaces,
                    neutered, has_special_needs, potty_trained, pet_description, user_id, img_url)
                VALUES
                    ('${animal_type}', '${name}', ${weight}, '${size}', '${gender}', '${activity_level}',
                    ${good_with_cats}, ${good_with_dogs}, ${good_with_kids}, ${good_with_smallspaces},
                    ${neutered}, ${has_special_needs}, ${potty_trained}, '${pet_description}', ${user_id}, '${img_url}')`;
            const result = await db(insertPetQuery);
            // Debugging
            console.log("result", result);

            const pet_id = result.insertId;

            const insertPostQuery = `
                INSERT INTO Posts (pet_id, post_owner_id, post_date)
                VALUES (${pet_id}, ${user_id}, NOW())`;

            const postresult =  await db(insertPostQuery);
            console.log(postresult);

            res.status(201).json({
                message: 'Pet added and post created successfully',
                pet_id: pet_id  // Send the pet_id back
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error adding pet' });
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
            good_with_cats, good_with_dogs, good_with_kids, good_with_smallspaces,
            neutered, has_special_needs, potty_trained, pet_description
        } = req.body;

        const checkOwnershipQuery = `SELECT user_id FROM Pets WHERE pet_id = ${pet_id}`;
        const ownershipResult = await db(checkOwnershipQuery);

        if (!ownershipResult || !ownershipResult.data || ownershipResult.data.length === 0) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        if (ownershipResult.data[0].user_id != user_id) {
            return res.status(403).json({ message: 'Unauthorized to update this pet' });
        }

        const fields = {
            animal_type, name, weight, size, gender, activity_level,
            good_with_cats, good_with_dogs, good_with_kids, good_with_smallspaces,
            neutered, has_special_needs, potty_trained, pet_description
        };

        const updateFields = Object.entries(fields)
            .filter(([_, value]) => value !== undefined)
            .map(([key, value]) =>
                typeof value === "string" ? `${key} = '${value}'` : `${key} = ${value}`
            );

        if (updateFields.length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update" });
        }

        const updatePetQuery = `UPDATE Pets SET ${updateFields.join(', ')} WHERE pet_id = ${pet_id}`;

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


// Get Pet By ID WORKING (Logged in users can access, fe filters should work.) (Click on a button on post to open a pet page)
router.get("/:pet_id", authenticate, async (req, res) => {
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
        console.log("ROUTE", result.data);
        res.json(result.data);
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//Get all of current user´s posted pets.
router.get("/allpostedpets/:user_id", authenticate, async (req, res) => {
    try {
        const { user_id } = req.params;

        const query = `
            SELECT Pets.*, Posts.post_id, Posts.post_date
            FROM Pets
            LEFT JOIN Posts ON Pets.pet_id = Posts.pet_id
            WHERE Pets.user_id = ${user_id}`;

        const result = await db(query);

        // DEBUGGING
        console.log("ROUTER /allpostedpets/:user_id result", result);

        if (!result || !result.data || result.data.length === 0) {
            return res.status(404).json({ message: "No pets found for this user" });
        }

        res.json(result.data);
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
