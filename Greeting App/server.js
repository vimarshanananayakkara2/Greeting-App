const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

let username = "";

// middleware
app.use(express.urlencoded({ extended: true }));

// GET home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// POST request to receive name
app.post("/submit", (req, res) => {

    username = req.body.username;   // store name in variable

    res.redirect("/greet");         // redirect to GET route
});

// GET request to display name
app.get("/greet", (req, res) => {

    let filePath = path.join(__dirname, "views", "greeting.html");

    fs.readFile(filePath, "utf8", (err, data) => {

        let result = data.replace("{{name}}", username);

        res.send(result);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});