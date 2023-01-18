// Import Dependencies
const express = require('express') // import the express framework
const morgan = require('morgan') // import the morgan request logger
// require('dotenv').config() // Load my ENV file's variables
// const path = require('path')



// middleware 
const middleware = (app) => {
    app.use(morgan('tiny')) // this is for request logging, 'tiny' log
    app.use(express.urlencoded({ extended: true })) // parses url encoded
    app.use(express.static('public')) // serves static files  from 'public' folder
    app.use(express.json()) // parses incoming request payloads with JSON
}

// Export
module.exports = middleware