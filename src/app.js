import express from "express"
import config from './config/config.js'
import authRoute from "./routes/auth.route.js"
const app = express()


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/api/auth", authRoute);

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})