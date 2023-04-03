const express = require("express");
const app = express();

app.get("/", function (req, res) {
	res.send("Hello " + req.query.name);
});

app.listen(3000);
