const express = require('express');
const logger = require('morgan');
const socket = require('socket.io');
// const movies = require('./routes/movies') ;
const dataSocket = require('./app/api/controller/dataController') 
const users = require('./app/api/router/userRouter');
const data = require('./app/api/router/dataRouter');
const relay = require('./app/api/router/relayRouter');
const bodyParser = require('body-parser');
const mongoose = require('./app/api/config/database'); //database configuration
const cors = require('cors');
const session = require('client-sessions');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cors());
app.use(cookieParser());
// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', function(req, res){
res.json({"message" : "Build REST API with node.js"});
});
// public route
app.use('/users', users);
app.use('/data', data);
app.use('/relay', relay);
// private route
// app.use('/movies', validateUser, movies);
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// handle errors
app.use(function(err, req, res, next) {
 console.log(err);
 
  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else 
    res.status(500).json({message: "Something looks wrong :( !!!"});
});

app.use(function(req,res,next){
	req.io = io;
	next();
});

const server = app.listen(8080, function(){
 console.log('Node server 8080');
});

const io = socket(server);

require('./app/api/socket/socket')(io);

