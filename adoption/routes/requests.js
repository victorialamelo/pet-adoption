const express = require('express');
const router = express.Router();
const authenticate = require('./middleware/authentication');
const db = require("../model/helper");


//Create Adoption Request WORKING
router.post('/adopt', authenticate, async (req, res) => {
    try {
        console.log("ADOPTION REQUEST DETAILS:", req.body);
        const { pet_id, request_message } = req.body;
        const requester_id = req.user.user_id;

        if (!pet_id || !request_message) {
            console.log("Validation failed: Missing required fields");
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const insertRequestQuery = `
            INSERT INTO Requests (pet_id, requester_id, request_date, request_status, request_message)
            VALUES (${pet_id}, ${requester_id}, NOW(), 'pending', '${request_message}')
        `;

        console.log("Executing SQL Query:", insertRequestQuery);

        await db(insertRequestQuery);

        const checkQuery = `SELECT * FROM Requests WHERE pet_id = ${pet_id} AND requester_id = ${requester_id}`;
        const checkResult = await db(checkQuery);
        console.log("Inserted Request:", checkResult);

        console.log("Adoption request submitted successfully");
        res.status(201).json({ message: 'Adoption request submitted successfully' });

    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Get Adoption Requests (Users can only see their own pets' adoption requests)
router.get('/adoption-requests', authenticate, async (req, res) => {
    try {
        const { user_id } = req.user; // Logged-in user's ID
        const { pet_id, request_id } = req.query; // Optional filters

        console.log("Incoming request to /adoption-requests");
        console.log("Authenticated user_id:", user_id);
        console.log("Query parameters - pet_id:", pet_id, ", request_id:", request_id);

        let query = `
            SELECT Requests.*,
            Requests.request_status,
            Pets.name AS pet_name,
            Users.user_name AS requester_name
            FROM Requests
            JOIN Pets ON Requests.pet_id = Pets.pet_id
            JOIN Users ON Requests.requester_id = Users.user_id
            WHERE Pets.user_id = ?`;  // Ensuring only the pet owner's requests are fetched

        const queryParams = [user_id];

        if (pet_id) {
            query += ` AND Requests.pet_id = ?`;
            queryParams.push(pet_id);
        }

        if (request_id && !isNaN(request_id)) { // Check if request_id exists and is a valid number
            query += ` AND Requests.request_id = ?`;
            queryParams.push(request_id);
        }

        console.log("Executing SQL Query:", query);
        console.log("With parameters:", queryParams);

        const result = await db(query, queryParams);

        // Debugging: Check what we get back
        console.log("🛠 Full DB Response:", result);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "No adoption requests found" });
        }

        console.log("Adoption requests fetched successfully:", result);
        res.json(result);

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/my-requests', authenticate, async (req, res) => {
    try {
        const { user_id } = req.user; // Logged-in user's ID
        console.log("Incoming request to /my-requests");
        console.log("Authenticated user_id:", user_id);

        let query = `
            SELECT Requests.*,
            Pets.name AS pet_name,
            Pets.img_url AS pet_image,
            Users.user_name AS owner_name
            FROM Requests
            JOIN Pets ON Requests.pet_id = Pets.pet_id
            JOIN Users ON Pets.user_id = Users.user_id
            WHERE Requests.requester_id = ?`;  // Fetching requests made BY the user

        const queryParams = [user_id];

        console.log("Executing SQL Query:", query);
        console.log("With parameters:", queryParams);

        const result = await db(query, queryParams);
        console.log("🛠 Full DB Response:", result);

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "No adoption requests found" });
        }

        console.log("User's adoption requests fetched successfully:", result);
        res.json(result);
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Update Adoption Status
router.put('/request-status/:request_id', authenticate, async (req, res) => {
    try {
        const { request_id } = req.params;
        const { request_status } = req.body;
        const user_id = req.user.user_id; // Logged-in user (pet owner)

        if (!request_status) {
            return res.status(400).json({ message: 'Missing request status' });
        }

        // Fetch the pet owner based on the adoption request
        const checkRequestQuery = `
            SELECT p.user_id AS pet_owner_id
            FROM Requests r
            JOIN Pets p ON r.pet_id = p.pet_id
            WHERE r.request_id = ${request_id}
        `;
        const requestResult = await db(checkRequestQuery);

        if (!requestResult || !requestResult.data || requestResult.data.length === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }

        const { pet_owner_id } = requestResult.data[0];

        // Only allow the pet owner to update the status
        if (user_id !== pet_owner_id) {
            return res.status(403).json({ message: 'Unauthorized to update this request' });
        }

        // Update the request status
        const updateRequestQuery = `
            UPDATE Requests
            SET request_status = '${request_status}'
            WHERE request_id = ${request_id}
        `;
        await db(updateRequestQuery);

        res.status(200).json({ message: 'Adoption request status updated successfully' });

    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
