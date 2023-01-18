// Import Dependencies
const express = require('express') // import the express framework
const morgan = require('morgan') // import the morgan request logger
const session = require('express-session')
const MongoStore = require('connect-mongo')

// enabled so we can talk to our database
require('dotenv').config() 


// middleware 
const middleware = (app) => {
    app.use(morgan('tiny')) // this is for request logging, 'tiny' log
    app.use(express.urlencoded({ extended: true })) // parses url encoded
    app.use(express.static('public')) // serves static files  from 'public' folder
    app.use(express.json()) // parses incoming request payloads with JSON


    // tell express-ssession how to create and store our session
    // keys: 
    // secret (top secret code that allows for the creation of a session)
    // store ( tells connect mongo where to save the session in our db)
    // two options: 
    //    saveUninitialized (set to true)
    //    resave (set to false)
    app.use(
        session({
            // secret: 'xxgghhttrreew',
            secret: process.env.SECRET,
            store: MongoStore.create({
                mongoUrl: process.env.DATABASE_URL
            }),
            saveUninitialized: true,
            resave: false 
        })
    )
}

// Export
module.exports = middleware