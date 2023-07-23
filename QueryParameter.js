const express = require("express");
require("dotenv").config();
var bodyParser = require("body-parser");

var app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// Route for a query parameter
app
  .route("/name")
  .get(function (req, res, next) {
    const firstName = req.query.first;
    const lastName = req.query.last;

    res.json({ name: `${firstName} ${lastName}` });
    next();
  })
  .post(function (req, res, next) {
    const firstName = req.body.first;
    const lastName = req.body.last;

    res.json({ name: `${firstName} ${lastName}` });
    next();
  });

app.listen(port);
