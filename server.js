const express = require("express");
const app = express();

let wieMembersArray = [
	{ id: 1, name: "Manar" },
	{ id: 2, name: "Wijdene" },
	{ id: 3, name: "Nour" },
	{ id: 4, name: "Wijdene" },
];

let wieMembersAchievements = [];

app.get("/", function (req, res) {
	res.send("Hello " + req.query.name);
});

app.get("/hello-wie", function (req, res) {
	res.send("Hello WIE");
});

app.get("/hello-cs", function (req, res) {
	res.send("Hello CS members");
});

app.get("/wie", function (req, res) {
	res.send(wieMembersArray);
});

app.get("/wie/getById", function (req, res) {
	res.send(
		wieMembersArray.find((wieMember) => wieMember.id === parseInt(req.query.id))
	);
});

app.get("/wie/add", function (req, res) {
	wieMembersArray.push({
		id: wieMembersArray.length + 1,
		name: req.query.name,
	});

	res.send("Added succesfully");
});

app.get("/wie/delete", function (req, res) {
	wieMembersArray = wieMembersArray.filter((wieMember) => {
		return wieMember.id != parseInt(req.query.id);
	});

	res.send("Deleted succesfully");
});

app.get("/wie/update", function (req, res) {
	console.log(req.query.id);
	wieMembersArray = wieMembersArray.map((wieMember) => {
		if (wieMember.id === parseInt(req.query.id)) {
			return {
				id: wieMember.id,
				name: req.query.name,
			};
		} else return wieMember;
	});

	res.send("Member of ID " + req.query.id + " has been updated succesfully");
});

app.listen(3000);
