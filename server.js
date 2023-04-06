const express = require("express");
const app = express();

app.get("/", function (req, res) {
	res.send("Hello " + req.query.name);
});

app.get("/wie", function (req, res) {
	res.send("Hello WIE");
});

app.get("/cs", function (req, res) {
	res.send("Hello CS members");
});

app.get("/stagiaires", function (req, res) {
	res.send([
		{ name: "Eya", age: 20 },
		{ name: "Khalil", age: 20 },
		{ name: "Abderrazek", age: 20 },
	]);
});

app.listen(3000);
