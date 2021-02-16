const express = require("express");
const app = express();
const data = require("./source/data");
const PORT = process.env.PORT || 3000;

data();

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello", successRate: 89 });
});

app.listen(PORT, () => {
  console.log("Server is listening...");
});
