// Load environment variables from a .env file
require("dotenv").config();

// Import the MySQL module to interact with a MySQL database
const mysql = require("mysql2/promise");

// Import the file system module to read SQL files
const fs = require("fs");

// Retrieve database connection details from environment variables
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

// Create a MySQL connection pool (allows multiple connections)
const pool = mysql.createPool({
    host: DB_HOST || "127.0.0.1", // Default to localhost if not provided
    user: DB_USER || "root", // Default to "root" if not provided
    password: DB_PASS, // Use provided password or undefined
    database: DB_NAME || "petadoption", // Default database name is "petadoption"
    waitForConnections: true,
    connectionLimit: 10,  // Adjust as needed
    queueLimit: 0,
    multipleStatements: true // Allows executing multiple SQL statements at once
});

// Establish a connection to initialize the database
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Connected!");

        // Read the contents of the "init_db.sql" file and convert it to a string
        let sql = fs.readFileSync(__dirname + "/init_db.sql").toString();

        // Execute the SQL statements from the file
        await connection.query(sql);
        console.log("Table creation was successful!");

        connection.release(); // Release the connection back to the pool
    } catch (err) {
        console.error("Database initialization error:", err);
    }
})();

// Export the pool to use it in other files
module.exports = pool;
