const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongojs = require('mongojs');
 
// Bring in the routes and models directories //
// ========================================== //
const routes = require('./routes/index.js');
const db = require("./models");

const PORT = process.env.PORT || 5150;

const app = express();

// View engine setup //
// ================= //
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

// Allow middleware for parsing data and serving directories //
// =============================================== //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Mongoose for queries and connecting to mongo db //
// =============================================== //

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {});

// Initializing the server //
// ======================= //
app.listen(PORT, function() {
  console.log(`Listing on port ${PORT}`)
});
