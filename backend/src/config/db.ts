import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection failed");
    process.exit(1);
  }
};

export default connectDB;
