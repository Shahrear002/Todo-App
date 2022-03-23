const express = require('express')
const router = express.Router()
const passport = require('passport')

//Load todo model
const Todo_model = require('../model/Todo')

//Load Input validation
const validateTodoInput = require('../validation/todo')

// @route GET todo/
// @description get all todos of a user
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id } = req.user
    
    Todo_model.find({ user: id }).then(todos => {
        res.status(200).json(todos)
    }).catch(error => console.log(error))
})

// @route GET todo/:id
// @description get a todo by todo id
// @access Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id } = req.user
    const { id } = req.params

    Todo_model.findById({ _id: id, user: _id }).then(todo => {
        res.status(200).json(todo)
    }).catch(error => console.log(error))
})

// @route POST todo/add-todo
// @description adding todo
// @access Private
router.post('/add-todo', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateTodoInput(req.body)

    const {todo} = req.body
    const _id = req.user

    if(!isValid){
        res.status(400).json('Field can not be empty!')
    } else {
        const newtodo = new Todo_model({todo, done: false, user: _id })

        newtodo.save()
            .then((todos) => {
                // console.log(todos)
                res.status(200).json(todos)
            })
            .catch(err => {
                console.log(err)
            })
    }   
})

// @route GET todo/delete-todo
// @description delete todo
// @access Private
router.delete('/delete-todo/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params
    const userId = req.user

    Todo_model.deleteOne(id).then(() => {
        Todo_model.find({user: userId}).then(todos => {
            // console.log(todos)
            res.status(200).json(todos)
        })
    }).catch(err => console.log(err))
})

// @route GET todo/update-todo
// @description adding todo
// @access Private
router.put('/update-todo/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.params.id
    const userId = req.user

    Todo_model.findByIdAndUpdate({_id: id}, { done: true }, { new: true }).then(() => {
        Todo_model.find({user: userId}).then(todos => {
            // console.log(todos)
            res.status(200).json(todos)
        })
        
    }).catch(err => console.log(err))
})


module.exports = router