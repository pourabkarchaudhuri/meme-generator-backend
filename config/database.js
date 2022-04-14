const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(
        process.env.MONGO_CONNECTION_STRING,
        {
          auth: {
            username: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD,
          },
          dbName: "innovationlabdb",
          useNewUrlParser: true,
          useUnifiedTopology: true,
          retryWrites: false,
          minPoolSize: 10,
        }
      )
      .then((res, err) => {
        if (err) return reject(err);
        console.log("Connected to MongoDB");
        resolve();
      });
  });
};
