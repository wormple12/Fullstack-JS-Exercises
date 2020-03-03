const { osInfo } = require("./osInfo");

console.log(JSON.stringify(osInfo));

///////////////////////////////

const Dos_Detector = require("./dosDetector").DOS_Detector;
const dosDetector = new Dos_Detector(1000);

dosDetector.on("DosDetected", arg => {
  console.log("DosDetected event was triggered: " + JSON.stringify(arg));
});

dosDetector.addUrl("/url1");
dosDetector.addUrl("/url1");
setTimeout(() => {
  dosDetector.addUrl("/url1");
}, 980);
