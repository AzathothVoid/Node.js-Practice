var express = require("express");
require("dotenv").config();
var bodyParser = require("body-parser");

var app = express();

app.use(express.static("views/TimeStampAPI"));

function isNumeric(str) {
  return !isNaN(str);
}

app.get("/apis/date/:date?", (request, response) => {
  const params = request.params;

  const dateString = params.date;

  var date = new Date();

  if (!Boolean(dateString)) {
    return response.json({
      Unix: Math.floor(date.getTime() / 1000),
      UTC: date.toString(),
    });
  }

  if (isNumeric(dateString)) {
    const milliseconds = parseInt(dateString);
    date = new Date(milliseconds * 1000);
    utcString = date.toUTCString();

    return response.json({
      Unix: milliseconds,
      UTC: utcString,
    });
  }

  parsedDate = dateParser(dateString);

  date = new Date(parsedDate);

  if (!date.toJSON()) {
    return response.json({ err: "Invalid Date" });
  }

  return response.json({
    Unix: Math.floor(date.getTime() / 1000),
    UTC: date.toUTCString(),
  });
});

app.get("/apis/header/myinfo", (req, res) => {
  const headerData = req.headers;
  return res.status(200).json({
    ipaddress: req.socket.remoteAddress,
    language: headerData["accept-language"],
    software: headerData["user-agent"],
  });
});

function dateParser(date) {
  arr = date.split("-");
  parsedString = "0" + arr[0] + "-0" + arr[1] + "-0" + arr[2];
  return parsedString;
}

var listener = app.listen(3000, function () {
  console.log(`Server Listening on port 3000`);
});
