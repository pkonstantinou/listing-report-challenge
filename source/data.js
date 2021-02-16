const path = require("path");
const csv = require("csvtojson");

const fetchListings = async () => {
  const listings = await csv().fromFile(
    path.join(__dirname, "../data/listings.csv")
  );

  return listings.map((listing) => {
    return {
      ...listing,
      id: Number.parseInt(listing.id, 10),
      price: Number.parseInt(listing.price, 10),
      mileage: Number.parseInt(listing.mileage, 10),
    };
  });
};

const fetchContacts = async () => {
  const contacts = await csv().fromFile(
    path.join(__dirname, "../data/contacts.csv")
  );

  return contacts.map((contact) => {
    return {
      listing_id: Number.parseInt(contact.listing_id, 10),
      contact_date: Number.parseInt(contact.contact_date, 10),
    };
  });
};

const averageListingSellingPrice = async () => {
  const listings = await fetchListings();
  const sellerTypes = ["dealer", "private", "other"];
  output = [];

  sellerTypes.forEach((sellerType) => {
    sellerListings = listings.filter(
      (listing) => listing.seller_type === sellerType
    );

    const total = sellerListings.reduce((acc, currVal) => {
      return { price: acc.price + currVal.price };
    });

    const average = Math.round(total.price / sellerListings.length);

    output.push({ sellerType, average });
  });
  return output;
};

const percentualDistribution = async () => {
  const listings = await fetchListings();
  const count = {};

  // Count how many times a certain make appears in the listings dataset
  listings.forEach((listing) => {
    if (Object.keys(count).includes(listing.make)) {
      count[listing.make] += 1;
    } else {
      count[listing.make] = 1;
    }
  });

  // Convert the count to a percentual amount of listings
  for (let key of Object.keys(count)) {
    count[key] = Math.round((count[key] / listings.length) * 100);
  }

  return count;
};

module.exports = async () => {
  const averageListings = await averageListingSellingPrice();
  console.log(averageListings);
  const percentages = await percentualDistribution();
  console.log(percentages);
};
