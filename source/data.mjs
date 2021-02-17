import path from 'path'
import csv from 'csvtojson'
import { __dirname } from '../source/expose.mjs'
import { calculateFrequencies, remodelDataBasedOnDate } from './utils.mjs'

const fetchListings = async () => {
  const listings = await csv().fromFile(
    path.join(__dirname, "../data/listings.csv")
  );

  return listings.map((listing) => {
    return {
      ...listing,
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
      ...contact,
      contact_date: Number.parseInt(contact.contact_date, 10),
    };
  });
};

const findElement = (repo, id) => {
  const element = repo.find((el) => el["id"] === id);
  return element;
};

const avgListingSellingPrice = async () => {
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

const avgPriceOfMostContactedListings = async () => {
  const contacts = await fetchContacts();
  const listings = await fetchListings();

  const contactFreqs = calculateFrequencies(contacts, "listing_id");

  // Sort by highest contacted
  const entries = Object.entries(contactFreqs);
  const sorted = entries.sort((a, b) => b[1] - a[1]);

  // Keep only the highest 30%
  const size = Math.round(sorted.length * 0.3);
  const mostContactedListings = sorted.slice(0, size);

  // Calculate the average price of the highest 30%
  let total = 0;
  mostContactedListings.forEach((listing) => {
    total += findElement(listings, listing[0])["price"];
  });
  const average = Math.round(total / size);

  return average;
};

const topFiveMostContactedListings = async () => {
  const contacts = await fetchContacts();
  const listings = await fetchListings();
  // Remodel the contacts dataset based on date
  const data = remodelDataBasedOnDate(contacts, "contact_date");

  // Dig into the remodeled dataset and search for most contacted listings
  Object.keys(data).forEach((year) => {
    Object.keys(data[year]).forEach((month) => {
      const monthlyContacts = data[year][month];
      const monthlyContactFreqs = calculateFrequencies(
        monthlyContacts,
        "listing_id"
      );
      // Sort by highest contacted and keep the top 5
      const entries = Object.entries(monthlyContactFreqs);
      const sorted = entries.sort((a, b) => b[1] - a[1]);
      const topFiveListings = sorted.slice(0, 5);

      // For each listing of the top 5, retrieve its details from the
      // listings dataset and store them in a temporary array
      const tempArray = [];
      topFiveListings.forEach((listing, index) => {
        const element = findElement(listings, listing[0]);
        const object = {
          listing_id: listing[0],
          amount_of_contacts: listing[1],
          ranking: index + 1,
          make: element["make"],
          price: element["price"],
          mileage: element["mileage"],
        };
        tempArray.push(object);
      });
      data[year][month] = tempArray;
    });
  });
  return data;
};

export { fetchListings }