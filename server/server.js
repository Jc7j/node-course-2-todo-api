require('./config/config'); 

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');// Grabbing the mongoose from mongoose.js file
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

mongoose.set('useCreateIndex', true); // Stops 'deprecationwarnings: collection.ensureIndex is deprecated. Use createIndexes instead'

const app = express();
const port = process.env.PORT;

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

// UPDATING
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    // checking if statement is boolean
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime(); // return js timestamp
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }

        res.send({todo}); // todo: todo
    }).catch((e) => {
        res.status(400).send();
    });
});

// POST /users
app.post('/users', (req, res) => {
   var body = _.pick(req.body, ['email', 'password']); // pick method from lodash 
   var user = new User(body);

   user.save().then((user) => {
    return user.generateAuthToken();
    // res.send(user);
   }).then((token) => {
       res.header('x-auth', token).send(user); // Custom header to store token value
   }).catch((e) => {
       res.status(400).send(e);
   });
});

// Private Route for keeping users info private
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

if (!module.parent) { // This fixes 'Uncaught Error: listen EADDRINUSE :::3000' problem
    app.listen(port, () => {
        console.log(`Started on port ${port}`);
    });
}

module.exports = {app};