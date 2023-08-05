var express = require("express");
require("dotenv").config();
var bodyParser = require("body-parser");
const multer = require("multer");

var app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("views/FileMetaDataAPI"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.set("trust proxy", true);

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
    ipaddress: req.ip,
    language: headerData["accept-language"],
    software: headerData["user-agent"],
  });
});

app.post("/apis/file/metadata", upload.array("files"), (req, res) => {
  res
    .status(200)
    .header({ "Access-Control-Allow-Origin": "*" })
    .json(metadataJSON(req.files));
});

app.use(function (req, res, next) {
  res.status(404);
  res.type("txt").send("No such resouce");
});

function metadataJSON(files) {
  var metaData = new Array();

  for (let i = 0; i < files.length; i++) {
    metaData[i] = {
      name: files[i].originalname,
      size: files[i].size,
      path: files[i].path,
    };
  }
  return JSON.stringify(metaData);
}
function dateParser(date) {
  arr = date.split("-");
  parsedString = "0" + arr[0] + "-0" + arr[1] + "-0" + arr[2];
  return parsedString;
}
function fileChecker(req, res, next) {}
var listener = app.listen(3000, function () {
  console.log(`Server Listening on port 3000`);
});
  