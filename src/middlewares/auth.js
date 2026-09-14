import { verifyJWT } from "../utils/jwt.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    const cookie = req.headers.cookie;
    if (!cookie) return res.status(401).send("User not authorized");
    token = cookie.split("=")[1];
  }

  if (!token) return res.status(401).send("User not authorized");
  try {
    const data = await verifyJWT(token);
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).send("invalid token");
  }
};

export default auth;
