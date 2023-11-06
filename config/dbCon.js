const mongoose = require("mongoose");

const dbConnection = async () => {
  await mongoose
    .connect(process.env.DB_PORT)
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((err) => {
      console.log(`Mongodb connection error:  ${err}`);
    });
};

module.exports = dbConnection;
