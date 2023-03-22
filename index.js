const express = require("express");
const env = require("./config/envConfig");
const connect = require("./config/db");
const userRoutes = require("./routes/users/userRoutes");


const app = express();

//database connection
connect();

app.use(express.json());

//user routes

app.use("/api",userRoutes);

// Middleware




app.get('/',(req,res)=>{
    res.json({msg:'E-commerce server is running'});
})

const port = env.PORT || 5000;

app.listen(port, (req,res)=>{
    console.log('Your server is running',port);
})
