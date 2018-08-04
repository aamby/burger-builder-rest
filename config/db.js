var db = require('mongoose');
var assert = require('assert');

var env_value = process.argv[3]; //to know whether it is Dev/QA/Production environment

var mongodbURL ='mongodb://test:test@localhost:27017/burger_builder';
if(env_value === 'PROD'){
    mongodbURL='mongodb://test:test1234@ds263791.mlab.com:63791/burger_builder';
}

db.connect(mongodbURL, { useNewUrlParser: true }, (err) =>{
    assert.equal(null, err);
    console.log('Successfully connected mongo db instance with the url - '+ mongodbURL);
});

module.exports = db;