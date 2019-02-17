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

  // // deleteMany 
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // // deleteOne 
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // // findOneAndDelete
  // db.collection('todos').findOneAndDelete({text: 'Cook dinner'}).then((result) => {
  //   console.log(result);
  // });

  // // CHALLENGE
  // db.collection('Users').deleteMany({
  //   name: 'Jason'
  // });

  // db.collection('Users').findOneAndDelete({
  //   _id: new ObjectID('5c69cb2cc92787812aca655c')
  // }).then((results) => {
  //   console.log(JSON.stringify(results, undefined, 2));
  // });


  // client.close();
});