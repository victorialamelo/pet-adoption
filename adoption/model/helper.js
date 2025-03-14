require("dotenv").config();
const mysql = require("mysql2");

module.exports = async function db(query, values = []) {
	const results = {
		data: [],
		error: null,
	};
	let promise = await new Promise((resolve, reject) => {
		const DB_HOST = process.env.DB_HOST;
		const DB_USER = process.env.DB_USER;
		const DB_PASS = process.env.DB_PASS;
		const DB_NAME = process.env.DB_NAME;

		const con = mysql.createConnection({
			host: DB_HOST || "127.0.0.1",
			user: DB_USER || "root",
			password: DB_PASS,
			database: DB_NAME || "database",
			multipleStatements: true,
		});

		con.connect(function (err) {
			if (err) throw err;
			console.log("Connected!");

			con.query(query, values, function (err, result) {
				if (err) {
					results.error = err;
					console.log(err);
					reject(err);
					con.end();
					return;
				}

				if (!result.length) {
					if (result.insertId) {
						results.insertId = result.insertId; // Store the inserted ID
						console.log(results);
					}
					if (result.affectedRows === 0) {
						results.error = "Action not complete";
						console.log(err);
						reject(err);
						con.end();
						return;
					}
				}

				if (result.constructor.name === "ResultSetHeader") {
					console.log("ResultSetHeader returned (INSERT/UPDATE/DELETE query)");
					results.data = result;
					if (result.affectedRows === 0) {
						results.error = "No rows affected";
						console.warn("No rows were affected by the query.");
					}
				} else {
					// Otherwise, handle the case for SELECT queries (result will be an array of rows)
					if (Array.isArray(result)) {
						results.data = result;
						console.log("results.data (array of rows)", results.data);
					} else if (result.constructor.name === "RowDataPacket") {
						// Handle if it's a single RowDataPacket
						results.data = [result];
						console.log("results.data (single RowDataPacket)", results.data);
					}
				}

				con.end();
				resolve(results);
			});
		});
	});

	return promise;
};
