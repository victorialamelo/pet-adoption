const express = require('express');
const router = express.Router();
const db = require("../model/helper");
const authenticate = require('./middleware/authentication');

// Create a saved search - protected route
router.post('/', authenticate, async (req, res) => {
    const { search_name, search_query } = req.body;
    const user_id = req.user.id;

    console.log("Request body received:", req.body);
    console.log("User ID from token:", user_id);

    if (!search_name || !search_query) {
        return res.status(400).json({ message: 'Search name and search query are required' });
    }

    const query = 'INSERT INTO SavedSearches (user_id, search_name, search_query) VALUES (?, ?, ?)';

    try {
        const result = await db(query, [user_id, search_name, search_query]);

        if (result.error) {
            console.error("Error saving search:", result.error);
            return res.status(500).json({ message: 'Failed to save search' });
        }

        res.status(201).json({
            search_id: result.insertId,
            user_id,
            search_name,
            search_query,
        });
    } catch (err) {
        console.error("Error saving search:", err);
        return res.status(500).json({ message: 'Failed to save search' });
    }
});

// Get all saved searches for a user
router.get('/', authenticate, (req, res) => {
    const user_id = req.user.id;

    const query = 'SELECT * FROM SavedSearches WHERE user_id = ? ORDER BY created_at DESC';

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error("Error fetching saved searches:", err);
            return res.status(500).json({ message: 'Failed to fetch saved searches' });
        }

        res.json(results);
    });
});

// Delete a saved search
router.delete('/:id', authenticate, (req, res) => {
    const search_id = req.params.id;
    const user_id = req.user.id;

    // ensuring the search belongs to the user
    const query = 'DELETE FROM SavedSearches WHERE search_id = ? AND user_id = ?';

    db.query(query, [search_id, user_id], (err, result) => {
        if (err) {
            console.error("Error deleting saved search:", err);
            return res.status(500).json({ message: 'Failed to delete saved search' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Saved search not found or not authorized' });
        }

        res.json({ message: 'Saved search deleted successfully' });
    });
});

module.exports = router;