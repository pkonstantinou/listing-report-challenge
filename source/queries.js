const queries = {
  avgListingSellingPrice() {
    return `
      SELECT seller_type,
      ROUND(AVG(price)) AS avg
      FROM listings
      GROUP BY seller_type;
    `;
  },

  percentualDistribution() {
    return `
      SELECT make,
      ROUND(
        COUNT(*) * 100 / (
          SELECT COUNT(*)
          FROM listings
        )
      ) AS distribution
      FROM listings
      GROUP BY make;
    `;
  },

  listingsCount() {
    return `
      SELECT COUNT(*) AS count
      FROM listings;
    `;
  },

  avgPriceOfMostContactedListings(limit) {
    return `
      SELECT ROUND(AVG(price)) AS average_price
      FROM (
          SELECT price
          FROM contacts
            INNER JOIN listings ON listings.id = contacts.listing_id
          GROUP BY listing_id
          ORDER BY COUNT(*) DESC
          LIMIT ${limit}
        ) AS listings;
    `;
  },

  months() {
    return `
      SELECT DATE_FORMAT(created_at, '%m.%Y') as contact_month
      FROM contacts
      GROUP BY contact_month
      ORDER BY contact_month;
    `;
  },

  topFiveMostContactedListings(month) {
    return `
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
      WHERE contact_month = ${month}
      GROUP BY listing_id
      ORDER BY count DESC
      LIMIT 5;
    `;
  },
};

export default queries;
