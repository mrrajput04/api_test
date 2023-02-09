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
const insert = async (collection,  firstName,  email, lastName, password ) => {
  await (
    await dbConnect("users")
  )
    .insertOne({
      firstName,
      email,
      lastName,
      password,
    })
    .then(async(data,dob,Mobile_no) => {
      await (
            await dbConnect("userProfile")
          )
            .insertOne({
              user_id:data._id,
              dob,
              Mobile_no
            })
            .then(() => console.log("data entered "));
        })
};




module.exports = insert;


