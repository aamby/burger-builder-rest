const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const debug = require('debug')('app:startup');
const routes = require('./routes');

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

//Third party middleware
app.use(helmet());
app.use(compression());
app.use(morgan('tiny'));
app.use(cors({
    origin: '*',
    credentials: true,
    exposedHeaders: 'Authorization',
}));

//Routing
routes.defineRoutings(app);

//============================

app.listen(port, () =>{
    debug(`app is listening on port ${port}`);
});

//DEBUG=app:* nodemon server.js
