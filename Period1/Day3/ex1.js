const randomBytes = require("crypto").randomBytes;
var randoms;

// a)
randoms = [];

randomBytes(48, function(err, buffer) {
  let secureHex = buffer.toString("hex");
  randoms.push({ length: 48, random: secureHex });
  randomBytes(40, function(err, buffer) {
    let secureHex = buffer.toString("hex");
    randoms.push({ length: 40, random: secureHex });
    randomBytes(32, function(err, buffer) {
      let secureHex = buffer.toString("hex");
      randoms.push({ length: 32, random: secureHex });
      var result = { title: "6 Secure Randoms", randoms: randoms };
      //console.log(result);
    });
  });
});

// b)
randoms = [];
function makeSecureRandom(size) {
  return new Promise((resolve, reject) => {
    randomBytes(size, function(err, buffer) {
      if (err) {
        reject(err); //return reject?
      }
      let secureHex = buffer.toString("hex");
      resolve({ length: size, random: secureHex }); // return resolve?
    });
  });
}

const p1 = makeSecureRandom(48);
const p2 = makeSecureRandom(40);
const p3 = makeSecureRandom(32);
const p4 = makeSecureRandom(24);
const p5 = makeSecureRandom(16);
const p6 = makeSecureRandom(8);

Promise.all([p1, p2, p3, p4, p5, p6]).then(results => {
  results.forEach(rnd => randoms.push(rnd));
  const finalResult = { title: "6 Secure Randoms", randoms: randoms };
  // console.log(finalResult);
});

// c)
async function getSecureRandoms(sizes) {
  let randoms = [];
  let promises = [];
  sizes.forEach(size => promises.push(makeSecureRandom(size)));
  const results = await Promise.all(promises);
  results.forEach(rnd => randoms.push(rnd));
  return { title: "6 Secure Randoms", randoms: randoms };
}

module.exports.getSecureRandoms = getSecureRandoms;
