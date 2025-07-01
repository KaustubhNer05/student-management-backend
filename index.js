const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql2.createConnection({
	host: process.env.db_host,
	user: process.env.db_user,
	password: process.env.db_password,
	database: process.env.db_name
});

app.post("/ss", (req, res) => {
	const sql = "INSERT INTO student VALUES(?, ?, ?)";
	con.query(sql, [req.body.rno, req.body.name, req.body.marks], (err, result) => {
		err ? res.send(err) : res.send(result);
	});
});

app.get("/gs", (req, res) => {
	con.query("SELECT * FROM student", (err, result) => {
		err ? res.send(err) : res.send(result);
	});
});

app.delete("/ds", (req, res) => {
	const sql = "DELETE FROM student WHERE rno=?";
	con.query(sql, [req.body.rno], (err, result) => {
		err ? res.send(err) : res.send(result);
	});
});
app.put("/us", (req, res) => {
	let sql = "update student set name= ?, marks = ? where rno = ?";
	let data = [req.body.name, req.body.marks, req.body.rno];
	con.query(sql, data, (error, result) => {
		if (error) res.send(error);
		else res.send(result);
	});
});
app.listen(9000, () => console.log("Server ready @ 9000"));