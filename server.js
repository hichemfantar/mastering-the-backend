const express = require("express");
const app = express();

let interns = ["Eya", "Khalil", "Abderrazek", "wijdene"];

app.get("/", function (req, res) {
	res.send("Hello " + req.query.name);
});

app.get("/wie", function (req, res) {
	res.send("Hello WIE");
});

app.get("/cs", function (req, res) {
	res.send("Hello CS members");
});

app.get("/interns", function (req, res) {
	res.send(interns);
});

app.get("/interns/add", function (req, res) {
	interns.push(req.query.name);

	res.send("Added succesfully");
});

app.get("/interns/delete", function (req, res) {
	interns = interns.filter((intern) => {
		return intern !== req.query.name;
	});

	res.send("Deleted succesfully");
});

app.listen(3000);
