var express = require("express");
require("dotenv").config();
var app = express();

var port = 3000;

absolute_path = __dirname + "/public";

app.use(function (req, res, next) {
  //logg = req.method + " " + req.path + " - " + req.ip;
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

app.get("/", function (req, res) {
  res.send("Hello Express");
});

app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE == "uppercase")
    res.json({ message: "HELLO JSON" });
  else res.json({ message: "hello json" });
});

app.use("/index", express.static(absolute_path));

app.listen(port);
