import authRoute from "./routes/auth.route.js";
import bodyParser from "body-parser";
import config from "./config/config.js";
import connectDb from "./config/database.js";
import express from "express";

const app = express();

connectDb();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(bodyParser.json());

app.use("/api/auth", authRoute);

app.listen(config.port, () => {
  console.log(`app listening on port ${config.port}`);
});
