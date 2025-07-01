const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL Connection using .env variables
const con = mysql2.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

con.connect((err) => {
	if (err) {
		console.log("❌ MySQL Connection Failed:", err);
	} else {
		console.log("✅ MySQL Connected Successfully");
	}
});

// ✅ Insert Student
app.post("/ss", (req, res) => {
	const sql = "INSERT INTO student VALUES(?, ?, ?)";
	con.query(sql, [req.body.rno, req.body.name, req.body.marks], (err, result) => {
		if (err) {
			console.log("❌ Insert Error:", err);
			res.send(err);
		} else {
			console.log("✅ Insert Success:", result);
			res.send(result);
		}
	});
});

// ✅ Get Students
app.get("/gs", (req, res) => {
	con.query("SELECT * FROM student", (err, result) => {
		if (err) {
			console.log("❌ DB Error:", err);
			res.send(err);
		} else {
			console.log("✅ Query Result:", result);
			res.send(result);
		}
	});
});

// ✅ Delete Student
app.delete("/ds", (req, res) => {
	const sql = "DELETE FROM student WHERE rno=?";
	con.query(sql, [req.body.rno], (err, result) => {
		if (err) {
			console.log("❌ Delete Error:", err);
			res.send(err);
		} else {
			console.log("✅ Delete Success:", result);
			res.send(result);
		}
	});
});

// ✅ Update Student
app.put("/us", (req, res) => {
	let sql = "UPDATE student SET name=?, marks=? WHERE rno=?";
	let data = [req.body.name, req.body.marks, req.body.rno];
	con.query(sql, data, (error, result) => {
		if (error) {
			console.log("❌ Update Error:", error);
			res.send(error);
		} else {
			console.log("✅ Update Success:", result);
			res.send(result);
		}
	});
});

// ✅ Server Listening
app.listen(9000, () => console.log("🚀 Server ready @ 9000"));
