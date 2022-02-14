const express = require('express')
const router = express.Router()
const passport = require('passport')

//Load todo model
const Todo_model = require('../model/Todo')

//Load Input validation
const validateTodoInput = require('../validation/todo')

// @route POST todo/add-todo
// @description adding todo
// @access Private
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

// @route GET todo/delete-todo
// @description delete todo
// @access Private
router.get('/delete-todo/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params

    Todo_model.deleteOne(id).then(() => {
        console.log('deleted!')
        res.status(200).send('Task Deleted')
    }).catch(err => console.log(err))
})

// @route GET todo/update-todo
// @description adding todo
// @access Private
router.get('/update-todo/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params

    Todo_model.updateOne({id}, { done: true }).then(() => {
        res.status(200).json('Task done!')
    }).catch(err => console.log(err))
})

module.exports = router