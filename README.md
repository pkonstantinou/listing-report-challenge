## Challenge requirements

You product manager is reaching out to you and kindly requests some basic report on listings and leads on our platform. Ideally the report is a web-ui so the product manager can look into it on a regular basis.

The report should include:

- Average Listing Selling Price per Seller Type
- Distribution (in percent) of available cars by Make
- Average price of the 30% most contacted listings
- The Top 5 most contacted listings per Month

## Milestones

The present state of this repository delivers the following milestones:

1. A web application that displays / outputs the reports which are server genereted html using `Express`. The style was kept quite simple with the use of `Bootstrap`.
2. An API endpoint which exposes the data in a structured format. This could be used from other teams within the same company that would like to re-use the aggregations.

## Terms & Taxonomy

- Listing: that's the representation of a car being sold.
- Make: "Producer" of cars, for instance BWM, Audi, VW, etc.
- Seller Type: What kind of seller is behind that listing. If it's "private", that means the car will be sold by a private person. If it's dealer, it's means that the car is sold on a dealer shop. "Other" means another types of sellers that ate not relevant in this context.
- Lead: Contact between a car buyer and car seller.

## Acceptance Criteria

### Average Listing Selling Price per Seller Type

- There are three Seller Types: private, dealer and other.
- For each of these types, it should be provided an average selling price.
- The average price should be formatted as € #,-
- Output format is free for you to choose, but an example could be:

| Seller Type | Average in Euro |
| ----------- | --------------- |
| private     | € 2.500,-       |
| dealer      | € 3.529,-       |
| other       | € 1.200,-       |

### Percentual distribution of available cars by Make

- For each make, it should be reported the percentual amount of listings.
- The report should be sorted by distribution, where makes with biggest numbers stays on top.
- Output format is free for you to choose, but an example could be:

| Make | Distribution |
| ---- | ------------ |
| Audi | 55%          |
| BMW  | 35%          |
| VW   | 10%          |

### Average price of the 30% most contacted listings

- Using the "Contacts CSV list", report the average price(format: € #,-) of the 30% most contacted listings.
- Output format is free for you to choose, but an example could be:

| Average price |
| ------------- |
| € 12.512,-    |

### The Top 5 most contacted listings per Month

- Using the "Contacts CSV list", report which listing had more contacts in each month.
- Reported fields: Ranking, Listing Id, Make, Selling Price (format: € #,-), Mileage(format: # KM), Total Amount of contacts
- Output format is free for you to choose, but an example could be:

Month: 01.2020

| Ranking | Listing Id | Make    | Selling Price | Mileage   | Total Amount of contacts |
| ------- | ---------- | ------- | ------------- | --------- | ------------------------ |
| 1       | 1000       | BWM     | € 2.538,-     | 50.000 KM | 15                       |
| 2       | 1001       | Audi    | € 4.300,-     | 20.000 KM | 12                       |
| 3       | 1002       | Toyota  | € 18.250,-    | 35.000 KM | 11                       |
| 4       | 1003       | VW      | € 25.080,-    | 45.678 KM | 10                       |
| 5       | 1004       | Porsche | € 102.000,-   | 2.000 KM  | 8                        |

Month: 02.2020

| Ranking | Listing Id | Make    | Selling Price | Mileage   | Total Amount of contacts |
| ------- | ---------- | ------- | ------------- | --------- | ------------------------ |
| 1       | 1004       | Porsche | € 102.000,-   | 2.000 KM  | 18                       |
| 2       | 1001       | Audi    | € 4.300,-     | 20.000 KM | 17                       |
| 3       | 1000       | BWM     | € 2.538,-     | 50.000 KM | 15                       |
| 4       | 1003       | VW      | € 25.080,-    | 45.678 KM | 10                       |
| 5       | 1002       | Toyota  | € 18.250,-    | 35.000 KM | 3                        |

### Definition of the CSV files

- Listing.csv

| field       | type         | required |
| ----------- | ------------ | -------- |
| id          | numeric      | yes      |
| make        | alphanumeric | yes      |
| price       | numeric      | yes      |
| mileage     | numeric      | yes      |
| seller_type | alphanumeric | yes      |

- contacts.csv

| field        | type              | required |
| ------------ | ----------------- | -------- |
| listing_id   | numeric           | yes      |
| contact_date | UTC Timestamp(ms) | yes      |

## Setup and execution

To run the application you will need the following:

- `Node.js` installed on your machine
- A clone of this repository
- Inside the project directory run `npm install` in order to install all the dependencies.
- Start the server with `npm start`
- Navigate to `http://localhost:3000` to get a review all the reports.
- Make a get request to API endpoint `http://localhost:3000/api/reports` to receive a json file with all the reports in a sctructured format.

## Tests

At the present state of the repository, the only tests that are provided are for the function #avgListingSellingPrice. To run all tests simply execute the command `npm test` inside the project's directory.
