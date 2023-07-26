// var http = require("http");

// http
//   .createServer(function (req, res) {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end("Hello World!");
//   })
//   .listen(8080);

const http = require("http");

const hostname = "https://www3.ntu.edu.sg/";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
