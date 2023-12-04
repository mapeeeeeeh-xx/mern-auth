import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

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
