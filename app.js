const express = require("express");
const path = require("path");
const { execSqlSync } = require("./driver.js");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const views = path.join(__dirname, "views");

app.get("/", (req, res) => {
    res.sendFile(path.join(views, "intro1.html"));
});

app.get("/intro_2", (req, res) => {
    res.sendFile(path.join(views, "intro2.html"));
});

app.get("/game", (req, res) => {
    res.sendFile(path.join(views, "game.html"));
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/js", express.static(path.join(__dirname, "js")));

app.post("/addtoDB", (req, res) => {
    console.log(req.body);
    const { sql, data } = req.body;
    console.log(sql, data);
    execSqlSync(sql, data);
});

app.listen(5000);
console.log("http://localhost:5000");
