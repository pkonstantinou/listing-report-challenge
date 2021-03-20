import queries from "../source/queries.js";

const avgListingSellingPrice = async (db) => {
  const results = await db.query(queries.avgListingSellingPrice());

  return results.map((element) => ({
    sellerType: element.seller_type,
    average: element.avg,
  }));
};

const percentualDistribution = async (db) => {
  const results = await db.query(queries.percentualDistribution());

  const obj = {};
  results.forEach((element) => {
    obj[element.make] = element.distribution;
  });
  return obj;
};

const avgPriceOfMostContactedListings = async (db) => {
  let result = await db.query(queries.listingsCount());
  const count = result[0].count;
  const thirtyPercent = Math.round(count * 0.3);

  result = await db.query(
    queries.avgPriceOfMostContactedListings(thirtyPercent),
  );
  return result[0].average_price;
};

const topFiveMostContactedListings = async (db) => {
  let result = await db.query(queries.months());
  const dates = result.map((element) => element.contact_month);

  const obj = {};
  for (const date of dates) {
    const topFive = await db.query(queries.topFiveMostContactedListings(date));
    const [month, year] = date.split(".");

    if (!obj[year]) obj[year] = {};
    if (!obj[month]) obj[year][month] = [];

    topFive.forEach((listing, index) => {
      obj[year][month].push({
        listing_id: listing.listing_id.toString(),
        amount_of_contacts: listing.count,
        ranking: index + 1,
        make: listing.make,
        price: listing.price,
        mileage: listing.mileage,
      });
    });
  }
  return obj;
};

const generateReports = async (db) => {
  try {
    const report1 = await avgListingSellingPrice(db);
    const report2 = await percentualDistribution(db);
    const report3 = await avgPriceOfMostContactedListings(db);
    const report4 = await topFiveMostContactedListings(db);

    return {
      avgListingSellingPrice: report1,
      percentualDistribution: report2,
      avgPriceOfMostContactedListings: report3,
      topFiveMostContactedListings: report4,
    };
  } catch (error) {
    console.log(error);
  }
};

export { generateReports };
