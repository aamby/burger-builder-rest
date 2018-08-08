const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const constants  = require('./settings/constants');
const config = require('config');
const app = express();
const bodyParser = require('body-parser');
const port = (config.get('envConfig.envPort') || constants.PORT);

//Middleware functions
//============================

//Inbuilt middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//Custom middleware
app.use(require('./middleware/header'));
app.use(require('./middleware/validateSession'));

//Third party middleware
app.use(helmet());

const runMode = config.get('envConfig.envMode') || constants.PROD_ENV;
if(runMode !== constants.PROD_ENV){
    app.use(morgan('tiny'));
}

//Routing
app.use('/test', (req,res) => {
    res.send('hello world');
    res.end();
});
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/sessions'));
app.use('/api/ingredientcontrols', require('./routes/ingredientControls'));

//============================



app.listen(port, () =>{
    console.log(`app is listening on port ${port}`);
});