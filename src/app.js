// Task-1
// Perform a series of MongoDB operations using insertOne, insertMany, find, limit, update operators ($set, $inc),
// updateMany, and deleteMany. Display the results as required.

// 1- Use insertOne to add 2 documents to a collection.
// 2- Use insertMany to add 10 documents to the same collection, ensuring that 5 of them have an age field set to 27.
// 3- Use find to display all documents where the age is 27.
// 4- Use limit to display only the first 3 documents where the age is 27.
// 5- Use $set to update the name field for the first 4 documents.
// 6- Use $inc to increment the age field by 1 for the first 4 documents.
// 7- Use updateMany to increment the age field by 10 years for all documents.
// 8- Use deleteMany to delete all documents where the age is 37.
// 9- Display the number of deleted documents using deleteCount.

const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;

const connectionUrl = "mongodb://127.0.0.1:27017";

const dbName = "Task";
mongoClient.connect(connectionUrl, (error, res) => {
  if (error) {
    return console.log("Error has Ocurred ");
  }
  console.log("All Perfect.");
  const db = res.db(dbName);

  ////////////////////////////////////////////////////////////////

  // 1- Use insertOne to add 2 documents to a collection.
  db.collection("Users").insertOne(
    {
      name: "Mai",
      age: 30,
    },
    (error, data) => {
      if (error) {
        console.log("Unable to insert Data .");
      }
      console.log(data.insertedId);
    }
  ); // end insertOne
  db.collection("Users").insertOne(
    {
      name: "Ashraf",
      age: 35,
    },
    (error, data) => {
      if (error) {
        console.log("Unable to insert Data .");
      }
      console.log(data.insertedId);
    }
  ); // end insertOne
  //////////////////////////////////////////////////////////////////////////
  //  2- Use insertMany to add 10 documents to the same collection, ensuring that 5 of them have an age field set to 27.
  db.collection("Users").insertMany(
    [
      {
        name: "Ahmed",
        age: 27,
      },
      {
        name: "Reem",
        age: 27,
      },
      {
        name: "Tasneem",
        age: 27,
      },
      {
        name: "Rahma",
        age: 27,
      },
      {
        name: "Ali",
        age: 27,
      },
      {
        name: "Adel",
        age: 40,
      },
      {
        name: "Mariam",
        age: 28,
      },
      {
        name: "Mostafa",
        age: 67,
      },
      {
        name: "Mohsen",
        age: 34,
      },
      {
        name: "Mohmoud",
        age: 23,
      },
    ],
    (error, data) => {
      if (error) {
        return console.log("Unable to inserted Data .");
      }
      console.log(data.insertedCount);
      console.log(data.insertedIds);
    }
  ); // end insertMany
  //////////////////////////////////////////////////////////////////////////////

  // 3- Use find to display all documents where the age is 27.

  db.collection("Users")
    .find({ age: 27 })
    .toArray((error, user) => {
      if (error) {
        return console.log("Don't Find User .");
      }
      console.log(user);
    }); // end Find
  // //////////////////////////////////////////////////////////////////////////////
  // // 4- Use limit to display only the first 3 documents where the age is 27.
  db.collection("Users")
    .find({ age: 27 })
    .limit(3)
    .toArray((error, user) => {
      if (error) {
        return console.log("Don't Find User .");
      }
      console.log(user);
    }); // end Find
  ///////////////////////////////////////////////////////////////////
  // 5- Use $set to update the name field for the first 4 documents.

  db.collection("Users")
    .find({})
    .limit(4)
    .forEach((ele) => {
      db.collection("Users").updateOne(
        { _id: ele._id },
        { $set: { name: "Rahma" } }
      );
    });

  //////////////////////////////////////////////////////////////////////////
  // 6- Use $inc to increment the age field by 1 for the first 4 documents.
  db.collection("Users")
    .find({})
    .limit(4)
    .forEach((ele) => {
      db.collection("Users").updateOne({ _id: ele._id }, { $inc: { age: 1 } });
    });
  ////////////////////////////////////////////////////////////////////////
  // 7- Use updateMany to increment the age field by 10 years for all documents.
  db.collection("Users")
    .updateMany(
      {},
      {
        $inc: { age: 10 },
      }
    )
    .then((data) => {
      console.log(data.modifiedCount);
    })
    .catch((error) => {
      console.log(error);
    }); // end updateMany

  ////////////////////////////////////////////////////////////////////////

  // 8- Use deleteMany to delete all documents where the age is 37 .
  db.collection("Users").deleteMany({ age: 37 });

  ////////////////////////////////////////////////////////////////////////////////
  // 9- Display the number of deleted documents using deleteCount.
  db.collection("Users")
    .deleteMany({ age: 38 })
    .then((data) => {
      console.log(data.deletedCount);
    })
    .catch((error) => {
      console.log(error);
    });

  ////////////////////////////////////////////////////////////////////////////
}); // Connection
