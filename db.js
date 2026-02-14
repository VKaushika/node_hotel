const mongoose=require('mongoose');

//Define the MongoDB connection URL
const mongoURL='mongodb://localhost:27017/hotels'   //Replace mydatabase with your database name

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