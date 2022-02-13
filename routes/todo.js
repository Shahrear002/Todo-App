const express = require('express')
const router = express.Router()
const passport = require('passport')

//Load todo model
const Todo_model = require('../model/Todo')

//Check for empty todo body
const isEmpty = require('../validation/is-empty')

router.post('/add-todo', passport.authenticate('jwt', { session: false }), (req, res) => {
    const {todo} = req.body
    const email = req.user.email
/*
    if(todo == ""){
        res.status(400).json('Field can not be empty!')
    } */
    
    const newtodo = new Todo_model({todo, email, done: false})

    newtodo.save()
        .then(() => {
            console.log('done')
            res.status(200).json('Task Added')
        })
        .catch(err => {
            console.log(err)
        })
    
})

module.exports = router