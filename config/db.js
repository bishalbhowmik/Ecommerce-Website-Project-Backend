const mongoose = require("mongoose");
const env = require("./envConfig");

const connect =() =>{
    try {
        mongoose.connect(env.URL);
        console.log("Database Connected");
    }
    catch(error){
        console.log(error.message);
        process.exit;
    }
}

module.exports= connect;