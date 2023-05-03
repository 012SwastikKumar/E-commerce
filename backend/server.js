const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database')

// handling uncaught exception
process.on("uncaughtException",err => {
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to Uncaught exception")
    process.exit(1);
})

// config
dotenv.config({path:"backend/config/config.env"})

// connecting to databse
connectDatabase();

// server port number
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

// unhandeled promise rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the server due to unhandled poromise rejcetion")
    server.close(()=>{
        process.exit(1);
    });
})