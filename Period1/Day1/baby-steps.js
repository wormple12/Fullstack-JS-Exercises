var element = 0;
for (let i = 2; i < process.argv.length; i++) {
  element += Number(process.argv[i]);
}
console.log(element);
