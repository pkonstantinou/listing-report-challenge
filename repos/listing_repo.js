import path from "path";
import { __dirname } from "./expose.js";
import csv from "csvtojson";

const listingRepo = {
  data: [],

  async load(filepath) {
    const repoFilepath = path.join(__dirname, filepath);
    const listings = await csv().fromFile(repoFilepath);

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
