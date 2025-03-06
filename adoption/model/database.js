// Load environment variables from a .env file
require("dotenv").config();

// Import the MySQL module to interact with a MySQL database
const mysql = require("mysql");

// Import the file system module to read SQL files
const fs = require("fs");

// Retrieve database connection details from environment variables
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

// Create a MySQL database connection using the provided credentials
const con = mysql.createConnection({
    host: DB_HOST || "127.0.0.1", // Default to localhost if not provided
    user: DB_USER || "root", // Default to "root" if not provided
    password: DB_PASS, // Use provided password or undefined
    database: DB_NAME || "petadoption", // Default database name is "library"
    multipleStatements: true, // Allows executing multiple SQL statements at once
});

// Establish a connection to the MySQL database
con.connect(function (err) {
    if (err) throw err; // If an error occurs, throw it
    console.log("Connected!"); // Log success message

    // Read the contents of the "init_db.sql" file and convert it to a string
    let sql = fs.readFileSync(__dirname + "/init_db.sql").toString();

    // Execute the SQL statements from the file
    con.query(sql, function (err, result) {
        if (err) throw err; // If an error occurs, throw it
        console.log("Table creation `books` was successful!"); // Log success message

        console.log("Closing..."); // Indicate that the connection will be closed
    });

    // Close the database connection
    con.end();
});
