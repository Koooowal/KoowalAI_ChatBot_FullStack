import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected to:", mongoose.connection.db.databaseName);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

export default db;