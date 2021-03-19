DROP DATABASE IF EXISTS listing_challenge_db;
CREATE DATABASE listing_challenge_db;
USE listing_challenge_db;
-- listings TABLE
CREATE TABLE listings (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  make VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  seller_type VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
-- contacts TABLE
CREATE TABLE contacts (
  listing_id INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY(listing_id) REFERENCES listings(id)
);