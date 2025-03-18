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


//Get Adoption Requests (Users can only see their own pets.)
router.get('/adoption-requests', authenticate, async (req, res) => {
    try {
        const { user_id } = req.user; // Logged-in user's ID
        const { pet_id } = req.query; // Optional pet_id filter

        console.log("Incoming request to /adoption-requests");
        console.log("Authenticated user_id:", user_id);
        console.log("Query parameter pet_id:", pet_id);

        let query = `
            SELECT Requests.*, Pets.name AS pet_name 
            FROM Requests
            JOIN Pets ON Requests.pet_id = Pets.pet_id
            WHERE Pets.user_id = ?`;

        const queryParams = [user_id];

        if (pet_id) {
            query += ` AND Pets.pet_id = ?`;
            queryParams.push(pet_id);
        }

        console.log("Executing SQL Query:", query);
        console.log("With parameters:", queryParams);

        const result = await db(query, queryParams);

        //Debugging: Check what we get back
        console.log("🛠 Full DB Response:", result);

        //Fixing result check
        if (!result || result.length === 0) {
            console.warn("⚠️ No adoption requests found for this user.");
            return res.status(404).json({ message: "No adoption requests found" });
        }

        console.log("Adoption requests fetched successfully:", result);
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
        const requester_id = req.user.user_id;

        if (!request_status) {
            return res.status(400).json({ message: 'Missing request status' });
        }

        const checkRequestQuery = `SELECT requester_id FROM Requests WHERE request_id = ${request_id}`;
        const requestResult = await db(checkRequestQuery);

        if (!requestResult || !requestResult.data || requestResult.data.length === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }

        if (requestResult.data[0].requester_id != requester_id) {
            return res.status(403).json({ message: 'Unauthorized to update this request' });
        }

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