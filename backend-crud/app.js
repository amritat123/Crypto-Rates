const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./api/config/db");

const cryptoRoute = require("./api/route/crypto_rate");

app.get("/api", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/reports", express.static("reports"));
app.use("/img", express.static("img"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});
app.use("/api", cryptoRoute);

app.use("/cancel", (req, res) => {
  console.log("cancel");
  console.log(req);
});
app.use("/success", (req, res) => {
  console.log("success");
  console.log(req);
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});
