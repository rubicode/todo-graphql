var express = require('express');
var router = express.Router();
const Todo = require('../models/Todo')

router.get('/', function (req, res, next) {
    Todo.find({}).then((todos) => {
        res.json({
            success: true,
            todos
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err
        })
    })
});

router.post('/', function (req, res, next) {
    Todo.create({ title: req.body.title }).then((todo) => {
        res.status(201).json({
            success: true,
            todo
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err
        })
    })
});

router.put('/:id', function (req, res, next) {
    Todo.findByIdAndUpdate(req.params.id, { 
        title: req.body.title, 
        complete: req.body.complete 
    }, {
        new: true
    }).then((todo) => {
        res.status(201).json({
            success: true,
            todo
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err
        })
    })
});

router.delete('/:id', function (req, res, next) {
    Todo.findByIdAndRemove(req.params.id).then((todo) => {
        res.status(201).json({
            success: true,
            todo
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err
        })
    })
});

module.exports = router;