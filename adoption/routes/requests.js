const express = require('express');
const router = express.Router();
const authenticate = require("./middleware/authentication");
const db = require("../model/helper");


//Create Adoption Request WORKING
router.post('/adopt', authenticate, async (req, res) => {
    try {
        const { pet_id, request_message } = req.body;
        const requester_id = req.user.user_id;

        if (!pet_id || !request_message) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const insertRequestQuery = `
            INSERT INTO Requests (pet_id, requester_id, request_date, request_status, request_message)
            VALUES (${pet_id}, ${requester_id}, NOW(), 'pending', '${request_message}')
        `;

        await db(insertRequestQuery);
        res.status(201).json({ message: 'Adoption request submitted successfully' });

    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


//Get Adoption Requests (Users can only see their own pets.)
router.get('/adoption-requests', authenticate, async (req, res) => {
    try {
        const user_id = req.user.user_id; // Logged-in user's ID

        const getRequestsQuery = `
            SELECT Requests.*, Pets.name AS pet_name 
            FROM Requests
            JOIN Pets ON Requests.pet_id = Pets.pet_id
            WHERE Pets.user_id = ${user_id}
        `;

        const adoptionRequests = await db(getRequestsQuery);
        res.status(200).json(adoptionRequests);
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({ message: 'Server error' });
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