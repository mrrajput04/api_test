const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "user-data";
async function dbConnect(collection) {
  await client.connect();
  const db = client.db(dbName);
  console.log("connected successfully to server");
  return db.collection(collection);
}

const db = require("./db");
const insert = async () => {
  await (
    await dbConnect("users")
  )
    .insertOne({
      firstname: "mike",
      email: "mike@gmail.com",
      lastname: "baker",
      password: 123456768,
    })
    .then(() => console.log("data entered "));
};
insert();

// dbConnect()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());
