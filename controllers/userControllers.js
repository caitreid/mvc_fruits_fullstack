// dependencies
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

//router
const router = express.Router()

router.post('/signup', async (req, res) => {
    // this route will take a req.body and use that data to create a user
    const newUser = req.body
    // then create the user
    
    // console.log('this is req.body', req.body)
    // res.json({ newUser: newUser })
    
    // we'll need to encrypt their password
    newUser.password = await bcrypt.hash(
        newUser.password, 
        await bcrypt.genSalt(10)
    )
    
    // if we're successful, send a 201 status
    User.create(newUser)
        .then(user => {
            // console.log('new user create \n', user)
            res.status(201).json({ username: user.username })
        })
        .catch( err => {
            console.log(err)
            res.json(err)
        })

    // if there is an error, handle the error 
})

// users/login
router.post('/login', async (req, res) => {
    // destructure username and password from req.body
    const { username, password } = req.body
    
    // search the db for user with given username
    User.findOne({ username })
        .then( async (user) => {
          
            if (user) {
                // compare passwords with bcrypt
                // bcrypt.compare => truthy or falsy value
                // save the result to a variable for easy reference later
                const result = await bcrypt.compare(password, user.password)

                // password -> comes from req.body
                // user.password -> saved in database

                // if the passwords match, place the user's info in the session
                if (result) {


                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user.id

                    console.log('this is req.session \n', req.session)

                    res.status(201).json({ username: user.username })

                } else {
                    //if the passwords don''t match, send user a message 
                    res.json({ error: 'username or password is incorrect' })
                }

            } else {
                // if user doesn't exits
                res.json({ error: 'user does not exist' })

            }
        })
        .catch(err => {
            console.log(err)
            res.json(err)
        })
})

// delete
// destroys a session in our db (and browser)

router.delete('/logout', (req, res) => {
    // destroy the session and send an appropriate response

    req.session.destroy(err => {
        console.log('this is req.session upon logout')
        console.log('error on logout \n', err)
        
        res.sendStatus(204)
    
    })

})



// export routes
module.exports = router