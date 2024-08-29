var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {connectToMongoDB} = require("../KarhabtiiBackEnd/db/db")//3



const http = require('http');


require('dotenv').config();


/// les routes de l'application:

var indexRouter = require('./routes/index');
var authorisedRouter = require('./routes/authorised')
var usersRouter = require('./routes/users');
var carsRouter = require('./routes/cars');
var annonceRouter = require ('./routes/annonce');
var assistanceSupportRouter = require ('./routes/assistance&support');
var commentaireRouter = require ('./routes/commentaire');
var transactionRouter = require ('./routes/transaction');






var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//usage des routes dans l'application

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cars',carsRouter);
app.use('/annnonce', annonceRouter);
app.use('/assistance&support', assistanceSupportRouter);
app.use('/commentaire', commentaireRouter);
app.use('/transaction', transactionRouter);
app.use('/auth',authorisedRouter);


///log des session





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



const server = http.createServer(app);  //1
server.listen(process.env.PORT,()=>{connectToMongoDB(),console.log("app is running Boss")});  //1 //2 process.env.PORT