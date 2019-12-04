//import mongoose from 'mongoose';
let express = require('express');
let TodoItem = require('../Models/TodoItem');

let router = express.Router();


//Get all todos
router.route('/').get((req, res, next) => {
    TodoItem.find( (err, docs) => {
        if (err) return next(err);
        else {
            console.log('found:');
            console.log(docs);
            res.json(docs);
        }
    })
})

// Create todo
router.route('/new').post((req, res, next) => {
    let todo = new TodoItem(req.body);
    //todo.date = new Date(); //todo: add on client side
    todo.save( err => {
        if (err) return next(err);
        else {
            console.log('saved:');
            console.log(todo);
            res.json(todo);
        }
    });
})

//Check if doc with id exists
router.param('id', function (req, res, next, id) {
    TodoItem.findById( id, (err, doc) => {
        if (err) return next(err);
        else if (!doc){
            res.status(404).json({
                msg: "Todo item not found"
              });
        } else {
            console.log('found by id:');
            console.log(doc);
            req.todoitem = doc; 
            next();
        }
    })
})

//Get, delete or update todo item with by id
router.route('/:id')
    .get( (req, res) => {
        res.json(req.todoitem );
    })
    .delete( (req, res, next) => {
        console.log('deleting doc');
        TodoItem.deleteOne(req.todoitem, (err, data) => {
            if (err) return next(err);
            else {
                res.status(200).json({
                    msg: data
                  });
            }
        })
    })
    .put( (req, res, next) => {
        console.log('updating doc');
        TodoItem.updateOne(req.todoitem, req.body, (err, data) => {
            if (err) return next(err);
            else {
                res.status(200).json({
                    msg: data
                  });
            }
        })
    })


module.exports = router;