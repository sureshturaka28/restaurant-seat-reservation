import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/db";
import seedTables from "./utils/seedTables";

const startServer = async () => {
  try {
    await connectDB();          
    await seedTables();         

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start", error);
    process.exit(1);
  }
};

startServer();
