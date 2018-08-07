const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = (process.env.PORT || 4545);

app.use(express.json());
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
    console.log(`app is listening on port ${port}`);
});