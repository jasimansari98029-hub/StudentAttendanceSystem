import mongoose from "mongoose";
import config from "./config.js";

async function connectDb() {
  try {
    const status = await mongoose.connect(config.mongodburl);
    console.log(`DB Connected :${status.connection.host}`);
  } catch (error) {
    console.log(" connecting DB");
    process.exit(1);
  }
}

export default connectDb;