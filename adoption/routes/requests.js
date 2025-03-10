const express = require('express');
const router = express.Router();
const authenticate = require("./middleware/authentication");
const db = require("../model/helper");

// Create Adoption Request
router.post('/', authenticate, async (req, res) => {
    const { pet_id, requester_id, request_date, request_status, request_message } = req.body;

    try {
        const query = `INSERT INTO Requests (pet_id, requester_id, request_date, request_status, request_message) 
                       VALUES (${pet_id}, ${requester_id}, '${request_date}', '${request_status}', '${request_message}')`;
        await db.query(query);
        res.status(201).json({ message: 'Request created successfully' });
    } catch (error) {
        console.error('Error creating request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get All Adoption Requests
router.get('/', authenticate, async (req, res) => {
    try {
        const query = 'SELECT * FROM Requests';
        const [requests] = await db.query(query);
        res.json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get Request By Request ID
router.get('/:request_id', authenticate, async (req, res) => {
    const { request_id } = req.params;

    try {
        const query = `SELECT * FROM Requests WHERE request_id = ${request_id}`;
        const [request] = await db.query(query);

        if (request.length === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.json(request[0]);
    } catch (error) {
        console.error('Error fetching request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Get Request By Pet ID
router.get('/pet/:pet_id', authenticate, async (req, res) => {
    const { pet_id } = req.params;

    try {
        const query = `SELECT * FROM Requests WHERE pet_id = ${pet_id}`;
        const [requests] = await db.query(query);
        
        if (requests.length === 0) {
            return res.status(404).json({ message: 'No adoption requests found for this pet.' });
        }

        res.json(requests);
    } catch (error) {
        console.error('Error fetching adoption requests for pet:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Update Request Status
router.put('/:request_id', authenticate, async (req, res) => {
    const { request_id } = req.params;
    const { request_status } = req.body;

    try {
        const query = `UPDATE Requests SET request_status = '${request_status}' WHERE request_id = ${request_id}`;
        const [result] = await db.query(query);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.json({ message: 'Request status updated successfully' });
    } catch (error) {
        console.error('Error updating request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete A Request
router.delete('/:request_id', authenticate, async (req, res) => {
    const { request_id } = req.params;

    try {
        const query = `DELETE FROM Requests WHERE request_id = ${request_id}`;
        const [result] = await db.query(query);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.json({ message: 'Request deleted successfully' });
    } catch (error) {
        console.error('Error deleting request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;