const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wieMemberSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		age: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const wieMemberModel = mongoose.model("WieMember", wieMemberSchema);

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

app.get("/wie", async function (req, res) {
	const wieMember = await wieMemberModel.find().sort({ createdAt: -1 });

	res.send(wieMember);

	// res.send(wieMembersArray);
});

app.get("/wie/getById", async function (req, res) {
	const wieMember = await wieMemberModel.findById(req.query.id);

	res.send(wieMember);

	// res.send(
	// 	wieMembersArray.find((wieMember) => wieMember.id === parseInt(req.query.id))
	// );
});

app.get("/wie/add", async function (req, res) {
	// add doc to db
	try {
		const wieMember = await wieMemberModel.create({
			name: req.query.name,
			age: req.query.age,
		});

		res.status(200).json(wieMember);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}

	res.send("Added succesfully");

	// wieMembersArray.push({
	// 	id: wieMembersArray.length + 1,
	// 	name: req.query.name,
	// });
});

app.get("/wie/delete", async function (req, res) {
	const wieMember = await wieMemberModel.findOneAndDelete({
		_id: req.query.id,
	});

	res.send(wieMember);

	// wieMembersArray = wieMembersArray.filter((wieMember) => {
	// 	return wieMember.id != parseInt(req.query.id);
	// });
});

app.get("/wie/update", async function (req, res) {
	await wieMemberModel.findOneAndUpdate(
		{ _id: req.query.id },
		{
			name: req.query.name,
			age: req.query.age,
		}
	);

	const updatedWieMember = await wieMemberModel.findById(req.query.id);

	res.send(updatedWieMember);

	// wieMembersArray = wieMembersArray.map((wieMember) => {
	// 	if (wieMember.id === parseInt(req.query.id)) {
	// 		return {
	// 			id: wieMember.id,
	// 			name: req.query.name,
	// 		};
	// 	} else return wieMember;
	// });
});

mongoose
	.connect("mongodb://localhost:27017/wie?retryWrites=true&w=majority")
	.then(() => {
		// listen for requests
		app.listen(3000, () => {
			console.log("connected to db & listening on port", 3000);
		});
	})
	.catch((error) => {
		console.log(error);
	});
