const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser=require('body-parser');
app.use(bodyParser.json());  //stores in req.body
const PORT=process.env.PORT || 3000;

const Person=require('./models/Person');
const MenuItem = require('./models/MenuItem'); 

app.get('/', (req, res) => {
  res.send('Welcome to our hotel')
})


//Import the router files
const personRoutes = require('./routes/personRoutes');
//Use the Routes
app.use('/person',personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu',menuItemRoutes);


app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000')
})

