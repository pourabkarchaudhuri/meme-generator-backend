const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/database");

// const storageHandler = require("./services/azureBlobStorage");
dbConnect().then(() => {
    console.log("Connected to database");
    //Read all files from a folder and keep in a datastructure
    const fs = require("fs");
    const path = require("path");
    const files = fs.readdirSync(path.join(__dirname, "images"));
    const data = [];

    // console.log(files)
    files.forEach((file) => {
        // const fileName = ;
        data.push({
            name: file.split(".")[0].replace(/-/g, " ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}),
            url: `https://${process.env.AZURE_CDN}.azureedge.net/${process.env.AZURE_STORAGE_CONTAINER_NAME}/${file}`,
        })
    });

    console.log(data)
    //Write data as JSON file
    fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(data));
    
});