import mysql from "mysql";
import listingRepo from "../repos/listing_repo.js";
import contactRepo from "../repos/contact_repo.js";

// Load the repositories
await listingRepo.load("../data/listings.csv");
await contactRepo.load("../data/contacts.csv");

// Connect with the db
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "listing_challenge_db",
});

const listings = listingRepo.all();
const contacts = contactRepo.all();
const data = [];
let q = "";

// Prepare listings
listings.forEach((listing) => {
  data.push([
    Number.parseInt(listing.id, 10),
    listing.make,
    listing.price,
    listing.mileage,
    listing.seller_type,
  ]);
});

// Inserting all listings to the db
q = "INSERT INTO listings (id, make, price, mileage, seller_type) VALUES ?";
connection.query(q, [data], (err, result) => {
  if (err) throw err;
  console.log(result);
});

// Clean up the data array
data.splice(0, data.length);

// Prepare contacts
contacts.forEach((contact) => {
  data.push([
    Number.parseInt(contact.listing_id, 10),
    new Date(contact.contact_date),
  ]);
});

// Inserting all contacts to the db
q = "INSERT INTO contacts (listing_id, created_at) VALUES ?";
connection.query(q, [data], (err, result) => {
  if (err) throw err;
  console.log(result);
});

// End connection with the db
connection.end();
