const http = require("http");
const osInfo = require("./osInfo").osInfo;

const server = http.createServer((req, res) => {
  if (req.url === "/api/os-info") {
    res.setHeader("Content-Type", "application/json");
    //Return a response with OS-info, using the code implemented in part-a
    res.write(JSON.stringify(osInfo));
    return res.end();
  }
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<h2>Simple node HTTP server demo</h2>
      <p>Exposes this endpoint <code>/api/os-info</code></p>
    `);
    return res.end();
  }
});
server.on("connection", sock => {
  // You can get the client-IP in here, using sock.remoteAddress)
  console.log("Connected to client-IP: " + sock.remoteAddress);
  dosDetector.addUrl(sock.remoteAddress);
});
server.listen(3000);
console.log("listening on 3000");

//Register for the "DosDetected" event and console.log the url and time info.
const DosDetector = require("./dosDetector").DOS_Detector;
const dosDetector = new DosDetector(100);

dosDetector.on("DosDetected", arg => {
  console.log("DosDetected event was triggered: " + JSON.stringify(arg));
});
