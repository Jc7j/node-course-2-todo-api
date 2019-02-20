// IF 'Error: listen EADDRINUSE: address already in use :::3000' use lsof -i tcp:3000 to find PID number that the thing is running and 
// use kill -15 (PID number) to kill the specific thing thats running

var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
        process.env.PORT = 3000;
        process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
    
} else if (env === 'test') {
        process.env.PORT = 3000;
        process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
    
}