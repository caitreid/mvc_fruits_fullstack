

// Import Dependencies
const mongoose = require('mongoose') // import the mongoose library
require('dotenv').config() // Load my ENV file's variables


// Database Connection
// this is where we will set up our inputs for our database connect function
const DATABASE_URL = process.env.DATABASE_URL

// here is our DB config object
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// establish our database connection
mongoose.connect(DATABASE_URL, CONFIG)

// Tell mongoose what to do with certain events
mongoose.connection
    .on('open', () => console.log('Connected to Mongoose'))
    .on('close', () => console.log('Disconnected from Mongoose'))
    .on('error', (err) => console.log('An error occurred: \n', err))


module.exports = mongoose