var express = require("express");
require("dotenv").config();
var bodyParser = require("body-parser");

var app = express();

function isNumeric(str) {
  return !isNaN(str);
}

app.get("/:date?", (request, response) => {
  const params = request.params;

  const dateString = params.date;

  var date = new Date();

  if (!Boolean(dateString)) {
    response.json({
      Unix: Math.floor(date.getTime() / 1000),
      UTC: date.toUTCString(),
    });
  }

  if (isNumeric(dateString)) {
    const milliseconds = parseInt(dateString);
    date = new Date(milliseconds * 1000);

    response.json({
      Unix: milliseconds,
      UTC: date.toUTCString(),
    });
  }

  date = new Date(dateString);

  if (!date.toJSON()) {
    response.json({ err: "Invalid Date" });
  }

  response.json({
    Unix: Math.floor(date.getTime() / 1000),
    UTC: date.toUTCString(),
  });
});

var listener = app.listen(3000, function () {
  console.log(`Server Listening on port 3000`);
});
