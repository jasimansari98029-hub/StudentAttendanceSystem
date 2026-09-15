import authRoute from "./routes/auth.route.js";
import bodyParser from "body-parser";
import config from "./config/config.js";
import connectDb from "./config/database.js";
import express from "express";
import studentRoute from "./routes/student.route.js";
import adminRoute from "./routes/admin.route.js";
import teacherRoute from "./routes/teacher.route.js";

const app = express();

connectDb();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(bodyParser.json());

app.use("/api/auth", authRoute);
app.use("/api/student", studentRoute);
app.use("/api/", adminRoute);
app.use("/api/teacher", teacherRoute);

app.listen(config.port, () => {
  console.log(`app listening on port ${config.port}`);
});
