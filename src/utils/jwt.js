import config from "../config/config.js";
import jwt from "jsonwebtoken";

const createJWT = (data) => {
  const token = jwt.sign(data, config.jwtsecret, {
    expiresIn: "14d",
  });

  return token;
};

const verifyJWT = async (token) => {
  return await new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtsecret, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

export { createJWT, verifyJWT };