const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const debug = require('debug')('app:startup');
const constants  = require('./settings/constants');
const homeRouter  = require('./routes/home');
const userRouter  = require('./routes/users');
const sessionRouter  = require('./routes/sessions');
const ingredientRouter  = require('./routes/ingredientControls');
const mwHeader  = require('./middleware/header');
const mwValidateSeeion  = require('./middleware/validateSession');

const app = express();
const port = config.get('envConfig.envPort') || constants.PORT;

//Setting view templates for html responses
//This is not required for our rest api
app.set('view engine', 'pug');
app.set('views', './views');

//Middleware functions
//============================

//Inbuilt middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Custom middleware
app.use(mwHeader);
app.use(mwValidateSeeion);

//Third party middleware
app.use(helmet());

const runMode = config.get('envConfig.envMode') || constants.PROD_ENV;
if(runMode !== constants.DEV_ENV){ //For testing purpose
    app.use(morgan('tiny'));
}

//Routing
app.use('/', homeRouter);
app.use('/api/users', userRouter);
app.use('/api/login', sessionRouter);
app.use('/api/ingredientcontrols', ingredientRouter);

// Handle 404 errors
app.use(function(req, res, next) {
    res.status(404);
    res.render('index', {titleValue: 'Error',messageHeading: '404 Error', messageBody: 'Requested info not found.'});
  });

  // Handle 400 errors
app.use(function(req, res, next) {
    res.status(400);
    res.render('index', {titleValue: 'Error',messageHeading: '400 Error', messageBody: 'Authorization/Authentication failed.'});
  });

  // Handle 500 errors
  app.use(function(err, req, res, next) {
    debug(err.message);//err.stack
    res.status(500);
    res.render('index', {titleValue: 'Error',messageHeading: '500 Error', messageBody: 'API processing error'});
    //res.sendFile(path.join(__dirname, './public', '500.html'));
  });

//============================

app.listen(port, () =>{
    debug(`app is listening on port ${port}`);
});

//DEBUG=app:* nodemon server.js
