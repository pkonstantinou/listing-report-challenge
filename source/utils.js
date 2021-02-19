const calculateFrequencies = (items, key) => {
  const obj = {};

  items.forEach((item) => {
    if (Object.keys(obj).includes(item[key])) {
      obj[item[key]] += 1;
    } else {
      obj[item[key]] = 1;
    }
  });
  return obj;
};

const remodelDataBasedOnDate = (data, dateHeader) => {
  const restructuredData = {};

  data.forEach((element) => {
    const date = new Date(element[dateHeader]);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();

    if (!Object.keys(restructuredData).includes(year)) {
      restructuredData[year] = {};
    }
    if (!Object.keys(restructuredData[year]).includes(month)) {
      restructuredData[year][month] = [];
    }
    restructuredData[year][month].push(element);
  });

  return restructuredData;
};

export { calculateFrequencies, remodelDataBasedOnDate }
