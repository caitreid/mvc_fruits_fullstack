// Schema and model for the Fruit resource

const mongoose = require('../utils/connection')


// const mongoose = require('mongoose')
const  {Schema, model} = mongoose

// Schema
const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
}) 

// Model
const Fruit = model('Fruit', fruitSchema)

module.exports = Fruit

