'use strict';

//Import the mongoose module
const mongoose = require('mongoose');
const config = require('./../configs/db');

//Set up default mongoose connection
const mongoDB = config.mongo;

mongoose.connect(mongoDB);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose; 