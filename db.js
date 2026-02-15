const mongoose=require('mongoose');
require('dotenv').config();

//Define the MongoDB connection URL
//const mongoURL=process.env.MONGODB_URL_LOCAL   //Replace mydatabase with your database name
const mongoURL=process.env.MONGODB_URL;
//Set Up Mongodb Connection
mongoose.connect(mongoURL);

//Get the default connrction
//MONGOOSE maintains a default connection object representing the MongoDB Connection.

const db=mongoose.connection;

//Define event listeners for database connection

db.on('connected',()=>{
    console.log('Connected to MongoDB Server');
});

db.on('error',(err)=>{
    console.log('MongoDB connection error!');
});

db.on('disconnected',()=>{
    console.log('MongoDB Disconnected');
});

//Export the database connection
module.exports=db;