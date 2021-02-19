import path from "path";
import { __dirname } from "./expose.js";
import csv from "csvtojson";

const contactRepo = {
  data: [],

  async load(filepath) {
    const repoFilepath = path.join(__dirname, filepath);
    const contacts = await csv().fromFile(repoFilepath);

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
