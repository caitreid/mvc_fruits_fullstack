// Schema and model for the Fruit resource

const mongoose = require('../utils/connection')


// const mongoose = require('mongoose')
const  {Schema, model} = mongoose

// Define User Schema and Create User Model

const userSchema = new Schema({ 
    username: {
        type: String,
        required: true,
        unique: true
    } ,
    password: {
        type: String,
        required: true,

    }
 })

 const User = model('User', userSchema)

 module.exports = User