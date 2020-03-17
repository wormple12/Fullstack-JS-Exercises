require("dotenv").config(); // ENVIRONMENT VARIABLES
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.DB_URI; // go to Atlas -> fullstack-cluster -> connect
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function mongoTest() {
  try {
    await client.connect();
    const dogs = client.db("kennel");
    const dogsCollection = dogs.collection("dogs");
    await dogsCollection.insertMany([
      { name: "Togo" },
      { name: "Fido" },
      { name: "Tut", race: "dog" }
    ]);
    await dogsCollection.insertOne({ name: "Fido2" });
    const allDogs = await dogsCollection.find({}).toArray();
    console.log(allDogs);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    console.log("Closes");
  }
}
mongoTest();
