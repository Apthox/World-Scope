var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require("passport");
var bodyParser = require('body-parser');
var localStrategy = require('passport-local');
const mongoose = require('mongoose');
var bcrypt = require('bcrypt');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var accountRouter = require('./routes/account');
var gameRouter = require('./routes/game');
var leaderboardRouter = require('./routes/leaderboard');

var dbconnection = require('./models/dbconnection');

dbconnection.get_dbo_instance().then( async (dbo) => {
    results = await dbo.collection('user').find({}).toArray();

    console.log(results[0].username)

    //console.log(dbo.collection('user').find({}).toArray().then(users => console.log(users)));
});


// var uri = "mongodb://sampop:Project2@cluster0-shard-00-00-hnxfk.mongodb.net:27017,cluster0-shard-00-01-hnxfk.mongodb.net:27017,cluster0-shard-00-02-hnxfk.mongodb.net:27017/project3?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";
// let dbconnection;
// mongoClient.connect(uri,(err,db) => {
//     if(err) {
//         console.log(err);
//         return err;
//     }
//     var dbo = db.db('project3')
//     dbo.listCollections().toArray().then(arr => {console.log(arr)})
//     dbconnection = dbo;
// })
// mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true });


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/account', accountRouter);
app.use('/game', gameRouter);
app.use('/leaderboard', leaderboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;