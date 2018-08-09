const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const debug = require('debug')('app:startup');
const homeRouter  = require('./routes/home');
const userRouter  = require('./routes/users');
const sessionRouter  = require('./routes/sessions');
const ingredientRouter  = require('./routes/ingredientControls');
const mwHeader  = require('./middleware/header');
const mwValidateSeeion  = require('./middleware/validateSession');

const app = express();
const port = config.get('envConfig.envPort');

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
app.use(morgan('tiny'));

//Routing
app.use('/', homeRouter);
app.use('/api/users', userRouter);
app.use('/api/login', sessionRouter);
app.use('/api/ingredientcontrols', ingredientRouter);

//============================

app.listen(port, () =>{
    debug(`app is listening on port ${port}`);
});

//DEBUG=app:* nodemon server.js
