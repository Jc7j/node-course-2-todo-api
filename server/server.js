var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');// Grabbing the mongoose from mongoose.js file
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Postman route
// For the url, for resources you can do /name
// Posts a todo from POSTMAN
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// Gets all todos when requesting from POSTMAN
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
}) ;

// GET /todos/1234324
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;


    // Valid id using isValid
    if (!ObjectID.isValid(id)) {
        // 404 - send back empty send
        return res.status(404).send();
    }
    
    // findById
    Todo.findById(id).then((todo) => {
        // if no todo - send back 404 with empty body
        if (!todo) {
            return res.status(404).send();
        }
        // success 
            // if todo - send it back
        res.send({todo});
    }).catch((e) => {
        // error
        // send back 400 - and send empty body back
        res.status(400).send();
    });
});

// DELETING
app.delete('/todos/:id', (req, res) => {
    // get the id
    var id = req.params.id;

    // validate the id -> not valid? return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

     // remove todo by id
        // success
            // if no doc, send 404
            // if doc, send doc back with 200
        // error
            // 400 with empty body
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });

});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};