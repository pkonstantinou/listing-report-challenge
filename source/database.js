import mysql from "mysql";
import util from "util";

// Connect with the db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "listing_challenge_db",
});

// Promisify for Node.js async/await.
db.query = util.promisify(db.query);

export default db;
