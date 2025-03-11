// Load environment variables from a .env file
require("dotenv").config();

// Import the MySQL module to interact with the database
const mysql = require("mysql2");

/**
 * Those are JSDoc comments, a special type of comment used to document JavaScript functions, parameters, and return values.

@param {string} query → Describes that the query parameter is a string and represents an SQL query.
@returns {Promise<object>} → Indicates that the function returns a Promise that resolves to an object.
 * Asynchronous function to execute a database query.
 * @param {string} query - The SQL query to execute.
 * @returns {Promise<object>} - A promise that resolves with the query results or an error.
 */
module.exports = async function db(query) {
    // Initialize an object to store query results and errors
    const results = {
        data: [],
        error: null,
    };

    // Return a promise that handles the database query execution
    let promise = await new Promise((resolve, reject) => {
        // Retrieve database credentials from environment variables
        const DB_HOST = process.env.DB_HOST;
        const DB_USER = process.env.DB_USER;
        const DB_PASS = process.env.DB_PASS;
        const DB_NAME = process.env.DB_NAME;

        // Create a connection to the MySQL database
        const con = mysql.createConnection({
            host: DB_HOST || "127.0.0.1", // Default to localhost if not provided
            user: DB_USER || "root", // Default to "root" if not provided
            password: DB_PASS, // Use provided password or undefined
            database: DB_NAME || "database", // Default database name is "database"
            multipleStatements: true, // Allows execution of multiple SQL statements in one query
        });

        // Establish the connection to the database
        con.connect(function (err) {
            if (err) throw err; // If connection fails, throw an error
            console.log("Connected!"); // Log successful connection

            // Execute the provided SQL query
            con.query(query, function (err, result) {
                if (err) {
                    // If an error occurs, store it in the results object and reject the promise
                    results.error = err;
                    console.log(err);
                    reject(err);
                    con.end(); // Close the database connection
                    return;
                }

                // Handle different types of MySQL query results
                if (!result.length) {
                    // If the query does not return a result set
                    if (result.affectedRows === 0) {
                        results.error = "Action not complete"; // No rows were affected
                        console.log(err);
                        reject(err);
                        con.end();
                        return;
                    }

                    // The following line was removed because it caused an unnecessary nested array:
                    // results.data.push(result);
                } else if (result[0].constructor.name == "RowDataPacket") {
                    // If the result contains rows, push each row into the data array
                    result.forEach((row) => results.data.push(row));
                } else if (result[0].constructor.name == "OkPacket") {
                    // If the result contains an OkPacket (e.g., from an INSERT operation),
                    // push the first item in the result list (e.g., LAST_INSERT_ID())
                    results.data.push(result[0]);
                    if (result[0].insertId) {
						results.insertId = result[0].insertId; // Store the inserted ID
					}
                }

                con.end(); // Close the database connection
                resolve(results); // Resolve the promise with the results
            });
        });
    });

    return promise; // Return the promise with the query results
};
