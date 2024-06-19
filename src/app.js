require('dotenv').config();
const express = require("express");
const server = express();
const cors = require('cors');
const morgan = require('morgan');                 // another HTTP request logger middleware
const mongoose = require("mongoose");             // Mongoose require
const port = process.env.PORT

const path = require('path');
const filePath = path.join(__dirname,'Public/Image');



// Database Connection ( DB )
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB is Connected..."))
    .catch((error) => console.log(error));


//  Middleware

server.use(cors()); 

server.use(express.json());
server.use(morgan('dev'));                       // logger


// Image Routes

server.use("/src/Public/image",express.static(filePath));



// App Routes

const appRoutes = require("./Routes/User/index.routes");
server.use("/api/app", appRoutes);




// Server

server.listen(port,()=> {
    console.log('Server Start......');
});