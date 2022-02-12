const express = require('express')
const router = express.Router()

//Load todo model
const Todo_model = require('../model/Todo')
const isEmpty = require('../validation/is-empty')

router.post('/add-todo', (req, res) => {
    const todo = req.body.todo
    if(isEmpty(todo)){
        res.status(400).json('Field can not be empty!')
    } 
    else {
        const newtodo = new Todo_model({todo, email: req.body.email, done: false})

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