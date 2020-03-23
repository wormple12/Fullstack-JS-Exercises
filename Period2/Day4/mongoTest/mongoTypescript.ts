require("dotenv").config(); // ENVIRONMENT VARIABLES
import * as mongo from "mongodb";
const MongoClient = mongo.MongoClient;
if (process.env.DB_URI === undefined)
  throw new Error("No Environment Variable found...");
const uri: string = process.env.DB_URI; // go to Atlas -> fullstack-cluster -> connect
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function insertAndReadData() {
  try {
    await client.connect();
    const db = client.db("test");
    await db.collection("inventory").deleteMany({});
    const result = await db.collection("inventory").insertOne({
      item: "canvas",
      qty: 100,
      tags: ["cotton"],
      size: { h: 28, w: 35.5, uom: "cm" }
    });
    /* console.log("Count", result.insertedCount);
    console.log("id", result.insertedId);
    console.log("Actual result", result.ops); */
    const results = await db
      .collection("inventory")
      .find({})
      .toArray();
    console.log(results);
  } catch (err) {
    console.log("UPPS --->", err);
  } finally {
    client.close();
    console.log("Connection Closed");
  }
}

async function connectSetupDataAndGetDB() {
  await client.connect();
  const db = client.db("test");
  await db.collection("inventory").deleteMany({});
  await db.collection("inventory").insertMany([
    {
      item: "journal",
      qty: 25,
      size: { h: 14, w: 21, uom: "cm" },
      status: "A"
    },
    {
      item: "notebook",
      qty: 50,
      size: { h: 8.5, w: 11, uom: "in" },
      status: "A"
    },
    {
      item: "paper",
      qty: 100,
      size: { h: 8.5, w: 11, uom: "in" },
      status: "D"
    },
    {
      item: "planner",
      qty: 75,
      size: { h: 22.85, w: 30, uom: "cm" },
      status: "D"
    },
    {
      item: "postcard",
      qty: 45,
      size: { h: 10, w: 15.25, uom: "cm" },
      status: "A"
    }
  ]);
  return db;
}

async function readDataWithQueries() {
  try {
    const db = await connectSetupDataAndGetDB();

    let result = await db
      .collection("inventory")
      .find({ status: "D" })
      .toArray();
    console.log(result);

    result = await db
      .collection("inventory")
      .find({ size: { h: 14, w: 21, uom: "cm" } })
      .toArray();
    console.log("2 ", result);

    result = await db
      .collection("inventory")
      .find({ "size.uom": "in" })
      .toArray();
    console.log("3 ", result);
  } catch (err) {
    console.log("UPPS --->", err);
  } finally {
    client.close();
    console.log("Closes connection");
  }
}

async function readDataWithOptions() {
  try {
    const db = await connectSetupDataAndGetDB();

    let result = await db
      .collection("inventory")
      .find(
        {},
        { projection: { _id: 0, item: 1, qty: 1 }, limit: 3, sort: { qty: -1 } }
      )
      .toArray();
    console.log(result);
  } catch (err) {
    console.log("UPPS --->", err);
  } finally {
    client.close();
    console.log("Closes connection");
  }
}

async function readDataWithOperatorsAndCompoundQueries() {
  try {
    const db = await connectSetupDataAndGetDB();

    let result = await db
      .collection("inventory")
      .find({ "size.h": { $lt: 10 } })
      .toArray();
    console.log(1, result);

    result = await db
      .collection("inventory")
      .find({ status: "A", qty: { $lt: 30 } })
      .toArray();
    console.log(2, result);

    result = await db
      .collection("inventory")
      .find({ $or: [{ item: "paper" }, { qty: { $lt: 30 } }] })
      .toArray();
    console.log(3, result);

    result = await db
      .collection("inventory")
      .find({
        status: "A",
        $or: [{ qty: { $lt: 30 } }, { item: { $regex: "^p" } }]
      })
      .toArray();
    console.log(4, result);
  } catch (err) {
    console.log("UPPS --->", err);
  } finally {
    client.close();
    console.log("Closes connection");
  }
}
async function updateData() {
  try {
    const db = await connectSetupDataAndGetDB();

    let res1 = await db.collection("inventory").findOneAndUpdate(
      { item: "paper" }, // specifies the document to update
      {
        $set: { "size.uom": "cm", status: "P" },
        $currentDate: { lastModified: true }
      },
      { returnOriginal: false }
    );
    console.log(res1.value);

    const res2 = await db.collection("inventory").updateMany(
      { qty: { $lt: 50 } }, // specifies the documents to update
      {
        $set: { "size.uom": "in", status: "P" },
        $currentDate: { lastModified: true }
      }
    );
    console.log(2, res2.modifiedCount);
  } catch (err) {
    console.log("UPPS --->", err);
  } finally {
    client.close();
    console.log("Closes connection");
  }
}
async function deleteData() {
  try {
    const db = await connectSetupDataAndGetDB();

    let result = await db
      .collection("inventory")
      .findOneAndDelete({ status: "D" });
    console.log(1, result.value);
  } catch (err) {
    console.log("UPPS --->", err);
  } finally {
    client.close();
    console.log("Closes connection");
  }
}
//insertAndReadData();
//readDataWithQueries();
//readDataWithOptions();
//readDataWithOperatorsAndCompoundQueries();
//updateData();
deleteData();
