import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { routes } from "./routes/routes";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(routes);

const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/default";
const port = process.env.PORT || 3000;

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => console.log("Server running"));
