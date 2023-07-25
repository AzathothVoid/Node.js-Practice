var express = require("express");
require("dotenv").config();
var bodyParser = require("body-parser");

var app = express();

app.get("/")


var listener = app.listen(process.env.PORT, function () {
  console.log(`Server Listening on port ${listener.address().port}`);
});
