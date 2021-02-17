import express from 'express'
import path from 'path'
import { __dirname } from './source/expose.mjs'
import listingRepo from './repos/listing_repo.mjs'
import { fetchListings } from './source/data.mjs'

// Load the repositories
await listingRepo.load();
// await contactsRepo.load();=

console.log(listingRepo.find('1013'))

const data = await fetchListings()
console.log(data)

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
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
