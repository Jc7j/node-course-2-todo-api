const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5c6a0dec42558a12ff0d756511';

// // IF ID NOT VALID, PRINT THIS
// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// // FIND 
// Todo.find({
//     _id: ids
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// // FIND ONE 
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// // FIND BY ID
// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));

User.findById('5c69e14765590709315ab659').then((user) => {
    if (!user) {
        return console.log('Unable to find user');
    }
    console.log(JSON.stringify(user,undefined, 2));
}, (e) => {
    console.log(e)
});