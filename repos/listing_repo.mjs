import path from 'path'
import csv from 'csvtojson'
import { __dirname } from '../source/expose.mjs'

const listingRepo = {
  data: [],

  async load() {
    const listings = await csv().fromFile(
      path.join(__dirname, "../data/listings.csv")
    );

    this.data = listings.map((listing) => {
      return {
        ...listing,
        price: Number.parseInt(listing.price, 10),
        mileage: Number.parseInt(listing.mileage, 10),
      };
    });
  },

  all() {
    return this.data;
  },

  find(id) {
    const listing = this.data.find((el) => el["id"] === id);
    return listing;
  },
};

export default listingRepo;
