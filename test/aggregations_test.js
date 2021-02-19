import { assert } from "chai";
import listingRepo from "../repos/listing_repo.js";
import contactRepo from "../repos/contact_repo.js";
import {
  avgListingSellingPrice,
  percentualDistribution,
  avgPriceOfMostContactedListings,
  topFiveMostContactedListings,
} from "../source/aggregations.js";

// Load the repositories
await listingRepo.load("../test/data/listings_test.csv");
await contactRepo.load("../test/data/contacts_test.csv");

// Run the aggregations individually and store their results
const report1Result = avgListingSellingPrice(listingRepo);

describe("aggregations", () => {
  describe("#avgListingSellingPrice", () => {
    it("should return type of array", () => {
      assert.typeOf(report1Result, "array");
    });

    it("should return an array of size 3", () => {
      assert.lengthOf(report1Result, 3);
    });

    it("should return an array that contains objects", () => {
      report1Result.forEach((element) => {
        assert.typeOf(element, "object");
      });
    });

    it("should have the correct keys in the objects of the returned array", () => {
      report1Result.forEach((element) => {
        assert.containsAllKeys(element, ["sellerType", "average"]);
      });
    });

    it("should have the key 'sellerType' with a value of string type in the objects of the returned array", () => {
      report1Result.forEach((element) => {
        assert.typeOf(element.sellerType, "string");
      });
    });

    it("should have the key 'average' with a value of number type in the objects of the returned array", () => {
      report1Result.forEach((element) => {
        assert.typeOf(element.average, "number");
      });
    });

    it("should return an empty array for an empty dataset", () => {
      const result = avgListingSellingPrice([]);
      assert.isEmpty(result);
    });

    it("should return the correct result for a given dataset", () => {
      const expected = [
        { sellerType: "dealer", average: 22435 },
        { sellerType: "private", average: 36248 },
        { sellerType: "other", average: 18372 },
      ];
      assert.deepEqual(report1Result, expected);
    });
  });
});
