var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Get env vars
var program_name = process.argv[0];
var script_path = process.argv[1];
var port = process.argv[2];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Handling CORS
app.use(require('./middleware/header'));
app.use(require('./middleware/validateSession'));


app.use('/test', (req,res) => {
    res.send('hello world');
});
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/sessions'));
app.use('/api/ingredientcontrols', require('./routes/ingredientControls'));

app.listen(port, () =>{
    console.log('app is listening on port '+ port);
});