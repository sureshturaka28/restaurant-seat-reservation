import Table from "../models/Table";
import tables from "../config/tables";

const seedTables = async () => {
  const count = await Table.countDocuments();

  if (count === 0) {
    await Table.insertMany(tables);
    console.log("Tables seeded");
  } else {
    console.log("Tables alregady exist");
  }
};

export default seedTables;
