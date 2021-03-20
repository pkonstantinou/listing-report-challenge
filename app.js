import express from "express";
import path from "path";
import { __dirname } from "./expose.js";
import { generateReports } from "./source/aggregations.js";
import db from "./source/database.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const reports = await generateReports(db);
  res.render("index", { reports });
});

app.get("/api/reports", async (req, res) => {
  const reports = await generateReports(db);
  res.json(reports);
});

app.listen(PORT, () => {
  console.log("Server is listening...");
});
