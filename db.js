const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function dbConnect() {
  return await client.connect().then(() => console.log("connected successfully"));
}
module.exports = dbConnect().catch(console.error);
