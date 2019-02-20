// IF 'Error: listen EADDRINUSE: address already in use :::3000' use killall -9 node to kill all other terminals running it
var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
        process.env.PORT = 3000;
        process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
    
} else if (env === 'test') {
        process.env.PORT = 3000;
        process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
    
}