const db = require("./models");
const express = require("express");
const cors = require("cors");
const app = express();
const productRouter = require("./router/Product");
const queriesRouter = require("./router/Queries");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/product", productRouter);

app.use("/queries", queriesRouter);


app.use(cors());

app.get("/", (res, req) => {
  res.render("/client/src/App.js");
});

app.listen('3001', (err, res) => {
  console.log('everything working');
});
