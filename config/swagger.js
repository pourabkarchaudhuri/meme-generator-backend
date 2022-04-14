const path = require("path");
//env
const dotenv = require("dotenv");
dotenv.config();
module.exports = (root, port) => {
  return {
    swaggerDefinition: {
      info: {
        description: "API documentation",
        title: "Meme API",
        version: "2.0.0",
      },
      host: `${process.env.SERVER_URL}`,
      basePath: "/api/v1",
      produces: ["application/json"],
      schemes: ["http", "https"],
    },
    basedir: root,
    files: ["./routes/*.js"],
  };
};
