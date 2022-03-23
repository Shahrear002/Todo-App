const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const passport = require('passport')

//Load User model
const User = require('../model/User')

//Load input validation
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

// @route POST users/test
// @description user test
// @access Public
router.get('/test', (req, res) => {
    res.status(200).json("Hello!")
})

// @route POST users/register
// @description user registration
// @access Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)

    //Check validation
    if(!isValid) {
        res.status(400).json(errors)
    } else { 
        User.findOne({ email: req.body.email }).then(user => {
            if(user) {
                errors.email = 'Email already exists'
                res.status(400).json(errors)
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.status(200).json('Registration Successfull'))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
    }
})

// @route POST users/login
// @description user login
// @access Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    //Check validation
    if(!isValid) {
        res.status(400).json(errors)
    } else {
        const email = req.body.email
        const pass = req.body.password
        
        User.findOne({ email }).then(user => {
            if(!user) {
                errors.email = 'User not found'
                res.status(400).json(errors)
            }

            bcrypt.compare(pass, user.password, (err, isMatch) => {
                if(isMatch) {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }

                    jwt.sign(payload, process.env.secretOrKey, { expiresIn: '20m' }, (error, token) => {
                        token = 'Bearer ' + token
                        res.status(200).json({ token, user})
                    })
                } else {
                    errors.password = 'Incorrect password'
                    res.status(400).json(errors)
                }
            })
        })
    }
})

module.exports = router
