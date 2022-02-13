const express = require('express')
const router = express.Router()
const passport = require('passport')

//Load todo model
const Todo_model = require('../model/Todo')

//Load Input validation
const validateTodoInput = require('../validation/todo')

router.post('/add-todo', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateTodoInput(req.body)

    const {todo} = req.body
    const email = req.user.email

    if(!isValid){
        res.status(400).json('Field can not be empty!')
    } else {
        const newtodo = new Todo_model({todo, email, done: false})

        newtodo.save()
            .then(() => {
                console.log('done')
                res.status(200).json('Task Added')
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    
    
})

module.exports = router