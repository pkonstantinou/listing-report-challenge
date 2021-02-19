import path from "path";
import csv from "csvtojson";
import { __dirname } from "./expose.js";

const contactRepo = {
  data: [],

  async load() {
    const contacts = await csv().fromFile(
      path.join(__dirname, "../data/contacts.csv"),
    );

    this.data = contacts.map((contact) => {
      return {
        ...contact,
        contact_date: Number.parseInt(contact.contact_date, 10),
      };
    });
  },

  all() {
    return this.data;
  },
};

export default contactRepo;
