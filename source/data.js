const path = require("path");
const csv = require("csvtojson");

const readListings = async () => {
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

const readContacts = async () => {
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
  const listings = await readListings();
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

module.exports = async () => {
  const result = await averageListingSellingPrice();
  console.log(result);
  // const contacts = await readContacts();
  // console.log(contacts);
};
