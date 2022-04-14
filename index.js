"use strict";

//Package dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const compression = require("compression");
const morgan = require("morgan");
const helmet = require("helmet");

//env
const dotenv = require("dotenv");
dotenv.config();

//Local dependencies
const dbConnect = require("./config/database");
const swaggerConfig = require("./config/swagger");
const memeRoutes = require("./routes/memeRoutes");

// Assign dynamic port
const app = express();
const port = process.env.PORT || 5000;

// Auto generates swagger file from route decorators
// if(process.env.NODE_ENV === 'development'){
const expressSwagger = require("express-swagger-generator")(app);
expressSwagger(swaggerConfig(__dirname, port));
// }

// Middleware configuration
app.use(cors());
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(morgan("common"));

// Assign routes
app.use("/api/v1", memeRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ success: false });
});

//DB Connection
dbConnect().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected on app termination");
    process.exit(0);
  });
});
