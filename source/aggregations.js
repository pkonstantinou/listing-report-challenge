import { calculateFrequencies, remodelDataBasedOnDate } from "./utils.js";
import listingRepo from "../repos/listing_repo.js";
import contactRepo from "../repos/contact_repo.js";

const avgListingSellingPrice = (listingRepo) => {
  const listings = listingRepo.all();
  const sellerTypes = ["dealer", "private", "other"];
  const output = [];

  sellerTypes.forEach((sellerType) => {
    // Find all the listings for a certain seller type
    const sellerListings = listings.filter(
      (listing) => listing.seller_type === sellerType,
    );

    // Calculcate the average listing selling price for that seller type
    const total = sellerListings.reduce((acc, currVal) => {
      return { price: acc.price + currVal.price };
    });
    const average = Math.round(total.price / sellerListings.length);

    output.push({ sellerType, average });
  });
  return output;
};

const percentualDistribution = (listingRepo) => {
  const listings = listingRepo.all();
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

const avgPriceOfMostContactedListings = (listingRepo, contactRepo) => {
  const contactFreqs = calculateFrequencies(contactRepo.all(), "listing_id");

  // Sort by highest contacted
  const entries = Object.entries(contactFreqs);
  const sorted = entries.sort((a, b) => b[1] - a[1]);

  // Keep only the highest 30%
  const size = Math.round(sorted.length * 0.3);
  const mostContactedListings = sorted.slice(0, size);

  // Calculate the average price of the highest 30%
  let total = 0;
  mostContactedListings.forEach((listing) => {
    total += listingRepo.find(listing[0])["price"];
  });
  const average = Math.round(total / size);

  return average;
};

const topFiveMostContactedListings = (listingRepo, contactRepo) => {
  // Remodel the contacts dataset based on date
  const data = remodelDataBasedOnDate(contactRepo.all(), "contact_date");

  // Dig into the remodeled dataset and search for most contacted listings
  Object.keys(data).forEach((year) => {
    Object.keys(data[year]).forEach((month) => {
      const monthlyContacts = data[year][month];
      const monthlyContactFreqs = calculateFrequencies(
        monthlyContacts,
        "listing_id",
      );
      // Sort by highest contacted and keep the top 5
      const entries = Object.entries(monthlyContactFreqs);
      const sorted = entries.sort((a, b) => b[1] - a[1]);
      const topFiveListings = sorted.slice(0, 5);

      // For each listing of the top 5, retrieve its details from the
      // listings dataset and store them in a temporary array
      const tempArray = [];
      topFiveListings.forEach((listing, index) => {
        const element = listingRepo.find(listing[0]);
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

const generateReports = (listingsRepo, contactsRepo) => {
  return {
    avgListingSellingPrice: avgListingSellingPrice(listingsRepo),
    percentualDistribution: percentualDistribution(listingsRepo),
    avgPriceOfMostContactedListings: avgPriceOfMostContactedListings(
      listingsRepo,
      contactsRepo,
    ),
    topFiveMostContactedListings: topFiveMostContactedListings(
      listingRepo,
      contactRepo,
    ),
  };
};

export {
  avgListingSellingPrice,
  percentualDistribution,
  avgPriceOfMostContactedListings,
  topFiveMostContactedListings,
  generateReports,
};
