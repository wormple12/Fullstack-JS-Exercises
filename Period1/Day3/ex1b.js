const { getSecureRandoms } = require("./ex1");

/* getSecureRandoms([48, 40, 32, 24, 16, 8]) //any size and values ok, as long as integers
  .then(randoms => console.log(randoms)); */

(async function logRandoms(sizes) {
  try {
    const result = await getSecureRandoms(sizes);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
})([48, 40, 32, 24, 16, 8]);
