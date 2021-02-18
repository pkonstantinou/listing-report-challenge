import express from 'express'
import path from 'path'
import { __dirname } from './expose.mjs'
import listingRepo from './repos/listing_repo.mjs'
import contactRepo from './repos/contact_repo.mjs'
import { generateReports } from './source/aggregations.mjs'

// Load the repositories
await listingRepo.load();
await contactRepo.load();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const reports = generateReports(listingRepo, contactRepo)
  res.render("index", {reports});
});

app.get("/api/reports", (req, res) => {
  const reports = generateReports(listingRepo, contactRepo)
  res.json(reports);
});

app.listen(PORT, () => {
  console.log("Server is listening...");
});
