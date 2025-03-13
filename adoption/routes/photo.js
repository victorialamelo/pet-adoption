var express = require("express");
var router = express.Router();
var db = require("../model/helper");
require("dotenv").config();

module.exports = (upload) => {

// POST route to upload a photo
// When a POST request is made to the route,
// upload.single('photo') middleware intercepts the request.
// It extracts the file from the photo field in the form data.
// It then stores the file in the destination specified in the multer configuration (./client/public in your case).
router.post('/', upload.single('photo'), async (req, res) => {

  // Extract the filename from the uploaded file
  const { filename } = req.file;
  // SQL query to insert the filename into the database
  const sql = `INSERT INTO photos (filename) VALUES ('${filename}')`;
  try {
    await db(sql);
    // Fetch all photos from the database
    const response = await db("SELECT * FROM photos");
    // Send the fetched photos as the response
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// GET route to fetch all photos
router.get('/', async (req, res) => {
  try {
    const response = await db("SELECT * FROM photos");
    // Send the fetched photos as the response
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

return router;
}
