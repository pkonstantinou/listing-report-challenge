-- 1
SELECT seller_type,
  ROUND(AVG(price)) AS avg
FROM listings
GROUP BY seller_type;
-- 2
SELECT make,
  ROUND(
    COUNT(*) * 100 / (
      SELECT COUNT(*)
      FROM listings
    )
  ) AS distribution
FROM listings
GROUP BY make;
-- 3
-- FIRST GET THE COUNT
SELECT COUNT(*) AS count
FROM listings;
-- THEN FIND THE AVERAGE PRICE
SELECT ROUND(AVG(price)) AS average_price
FROM (
    SELECT price
    FROM contacts
      INNER JOIN listings ON listings.id = contacts.listing_id
    GROUP BY listing_id
    ORDER BY COUNT(*) DESC
    LIMIT 90
  ) AS listings;
-- 4
-- FIRST FIND ALL MONTHS
SELECT DATE_FORMAT(created_at, '%m.%Y') as contact_month
FROM contacts
GROUP BY contact_month
ORDER BY contact_month;
-- THEN FIND TOP 5 MOST CONTACTED LISTINGS PER MONTH
SELECT listing_id,
  contact_month,
  make,
  price,
  mileage,
  COUNT(*) AS count
FROM (
    SELECT listing_id,
      DATE_FORMAT(contacts.created_at, '%m.%Y') AS contact_month,
      make,
      price,
      mileage
    FROM contacts
      INNER JOIN listings ON listings.id = contacts.listing_id
  ) data
WHERE contact_month = '01.2020'
GROUP BY listing_id
ORDER BY count DESC
LIMIT 5;