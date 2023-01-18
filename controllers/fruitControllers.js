// dependencies
const express = require('express')
const Fruit = require('../models/fruit')

//router
const router = express.Router()

// seed route for db
router.get('/seed', (req, res) => {
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


// index route
router.get('/', (req, res) => {
    Fruit.find({})
        .then(fruits => { res.json( { fruits: fruits })})
        .catch(err => console.log('The following error occured: \n', err))
})


// Show
router.get('/:id', (req, res) => {
    // get the id -> save to variable
    const id = req.params.id

    Fruit.findById(id)
        .then( fruit => res.json({ fruit: fruit }))
        .catch(err => console.log(err))
})

// Create
router.post('/', (req, res) => {
    // here, we'll have something called a request body
    // inside this function, that will be called req.body
    // we want to pass our req.body to the create method
    const newFruit = req.body
    Fruit.create(newFruit)
        // send a 201 status, along with the json response of the new fruit
        .then(fruit => {
            res.status(201).json({ fruit: fruit.toObject() })
        })
        // send an error if one occurs
        .catch(err => console.log(err))
})

// PUT - replaces the entire document with a new one from req.body
// PATCH - updates specific fields at specific times
router.put('/:id', (req, res) => {
    // save id to a variable
    const id = req.params.id
    // save the request body to a variable
    const updatedFruit = req.body
    // use mongoose method findByIdAndUpdate

    Fruit.findByIdAndUpdate(id, updatedFruit, { new: true } )
        .then(fruit => {
            console.log( 'The newly updated fruit', fruit )

            res.sendStatus(204)
        })
        .catch(err => console.log(err))
})


// Delete Route
router.delete('/:id', (req, res) => {

    const id = req.params.id

    Fruit.findByIdAndRemove(id)
        .then(() => {
            res.sendStatus(204)
        })

        .catch(err => console.log(err))

})

// SHOW route
// Read -> finds and displays a single resource
router.get('/:id', (req, res) => {
    // get the id -> save to a variable
    const id = req.params.id
    // use a mongoose method to find using that id
    Fruit.findById(id)
        // send the fruit as json upon success
        .then(fruit => {
            res.json({ fruit: fruit })
        })
        // catch any errors
        .catch(err => console.log(err))
})

// export routes
module.exports = router