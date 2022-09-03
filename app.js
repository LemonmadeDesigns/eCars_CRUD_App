// REQUIRE SPECIFIC MODULES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// CREATE ROUTE
const routes = require('./routes/routes');
 
// CONFIGURE PROMISE TO DATABASE
mongoose.Promise = global.Promise;
 
// CONNECT TO DATABASE, IF ERROR EXIT
mongoose.connect('mongodb://localhost/customCars',
{
   useNewUrlParser: true,
   useUnifiedTopology: true
})
.then(() => {
   console.log("Successfully connected to database...");   
}).catch(err => {
   console.log(`Could not connect to MongoDB. Here's why: ${err}`);
   process.exit();
});
 
// USE BODY-PARSER
app.use(bodyParser.json());

// DIRECT PATH
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
global.__basedir = __dirname;

// 
routes(app);
 
// CREATE PORT TO SERVER LOCALHOST
const PORT = 5150

// CREATE SERVER
app.listen(PORT, function () {
 console.log(`Running on http://localhost:${PORT}`);
});