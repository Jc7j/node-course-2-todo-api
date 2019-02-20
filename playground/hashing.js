const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

var password = '123abc!';

// The longer the better for a password. 120 max maybe?
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

// Comparing values
var hashedPassword = '$2a$10$zXpwOg1YGWhVSWmNrtVXTut9LbiRtJ9zLj0jrHc.jGR22RNxVklBK';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

// // Hashing auth
// var data = {
//     id: 10
// };
// // It creates the hash & then returns the token value
// var token = jwt.sign(data, '123abc');
// console.log(token);

// //It takes that token & secret and makes sure that data wasnt manipulated
// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);


// // PLAYGROUND STUFF 
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// // Illustrate the data that we want to send back from the 
// // server to the client.
// var data = {
//     id: 4
// };

// // sends back to user
// // salting the hash: you add something onto the has thats unique that changes the value
// var token = { 
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString() 
// }


// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not trust!');
// }

