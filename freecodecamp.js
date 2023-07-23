//importing the express library for node.js
var express = require("express");

//importing the dotenv library that is used to load the environment variables from the .env file, allowing for the
//use of proccess.env function
require("dotenv").config();

//initializing express
var app = express();

//setting the port number on which the server will listen
var port = 3000;

//setting absolute path for the front-end website resources to be loaded
absolute_path = __dirname + "/public";

//root level middleware function that displays a string of information about
//request type, path and ip address of the requestee
app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

//Building an echo server and practicing route parameters
const routePath = "/:word/echo";
app.get(routePath, function (req, res, next) {
  const data = req.params;
  res.json({ echo: data.word });
  next();
});

//get route for displaying date via chaining middleware functions
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

//practice route
app.get("/", function (req, res) {
  res.send("Hello Express");
});

//practicing using env variables and the json function of res object
app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE == "uppercase")
    res.json({ message: "HELLO JSON" });
  else res.json({ message: "hello json" });
});

//Using inbuilt express middelware function for loading HTML and CSS Files from public folder
app.use("/index", express.static(absolute_path));

//Initializing server and making it listen on the port numbre set above
app.listen(port);
