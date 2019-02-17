// Can find a big list of update operators

// const MongoClient = require('mongodb').MongoClient;
const {
  MongoClient,
  ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {
  useNewUrlParser: true
}, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp')

  // // Find one and update.
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5c68ec5e4747e9c423736fe6')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });


  // CHALLENGE
  // Change an id to a different name and increment the age
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5c69cec4769259054dd09381')
  }, {
    $set: {
      name: 'Andrew'
    }, 
    $inc: {
      age: 22
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // client.close();
});