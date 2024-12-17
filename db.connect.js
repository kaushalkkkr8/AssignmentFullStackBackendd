const mongo = require("mongoose");
const mongoURI = process.env.MONGO;

mongo
  .connect(mongoURI)
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.error("unable to connect with database", err);
  });
