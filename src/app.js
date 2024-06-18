require('dotenv').config();
const express = require("express");
const server = express();
const cors = require('cors');
const morgan = require('morgan');                 // another HTTP request logger middleware
const mongoose = require("mongoose");             // Mongoose require
const port = process.env.PORT

const path = require('path');
const filePath = path.join(__dirname,'Public/Image');



// Database Connection 
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB is Connected..."))
    .catch((error) => console.log(error));




server.use(cors()); 

server.use(express.json());
server.use(morgan('dev'));                       // logger



const userRoutes = require("./Routes/User/index.routes");
server.use("api/users", userRoutes);

server.listen(port,()=> {
    console.log('Server Start......');
});