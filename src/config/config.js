import dotenv from "dotenv";

dotenv.config();

const config = {
  name: process.env.NAME || "",
  port: process.env.PORT ,
  version: process.env.VERSION || "1.0.0",
  mongodburl: process.env.MONGODB_URL || "",
  jwtsecret: process.env.JWT_SECRET || "KEY",
  appUrl: process.env.APP_URL || "",


};

export default config;