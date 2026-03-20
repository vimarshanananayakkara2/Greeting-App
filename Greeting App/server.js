const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

let username = "";

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/submit", (req, res) => {

    username = req.body.username;   

    res.redirect("/greet");         
});

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
