const express = require('express');
const homeRouter  = require('./routes/home');
const userRouter  = require('./routes/users');
const sessionRouter  = require('./routes/sessions');
const ingredientRouter  = require('./routes/ingredientControls');
const testRouter  = require('./routes/tests');

const routes = (app) =>{
    app.use('/', homeRouter);
    app.use('/api/users', userRouter);
    app.use('/api/login', sessionRouter);
    app.use('/api/ingredientcontrols', ingredientRouter);
    app.use('/api/tests', testRouter);
}

module.exports = routes;

