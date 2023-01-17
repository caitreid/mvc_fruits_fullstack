
// Import Dependencies
const express = require('express') // import the express framework
const mongoose = require('mongoose') // import the mongoose library
const morgan = require('morgan') // import the morgan request logger
require('dotenv').config() // Load my ENV file's variables
const path = require('path')

// import models
const Fruit = require('./models/fruit')

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



// Create our Express App Object
const app = express()

// middleware 
app.use(morgan('tiny')) // this is for request logging, 'tiny' log
app.use(express.urlencoded({ extended: true })) // parses url encoded
app.use(express.static('public')) // serves static files  from 'public' folder
app.use(express.json()) // parses incoming request payloads with JSON



// Routes
app.get('/', (req, res) => {
    res.send('Server is live, ready for requests')
})

// seed route for db
app.get('/fruits/seed', (req, res) => {
    // array of starter fruits/resources
    const startFruits = [
        { name: 'apple', color: 'green', readyToEat: true },
        { name: 'banana', color: 'yellow', readyToEat: false },
        { name: 'grapes', color: 'purple', readyToEat: false },
        { name: 'strawberries', color: 'red', readyToEat: true },
    ]
    // then delete every fruit in the db
    Fruit.deleteMany({})
        .then(() => {
            // then seed(create) starter fruits
            Fruit.create(startFruits)
                .then(data => {

                    res.json(data)

                })
                .catch(err => console.log('The following error occurred: \n', err))
            
                // tell db what to do with success/failures

        })
})

// seed script, best practices


// index route
app.get('/fruits', (req, res) => {
    Fruit.find({})
        .then(fruits => { res.json( { fruits: fruits })})
        .catch(err => console.log('The following error occured: \n', err))
})


// Server Listener    
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

// END