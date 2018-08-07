const db = require('mongoose');
const assert = require('assert');

const runMode = process.env.RUNMODE || 'PROD'; //to know whether it is Dev/QA/Production environment

let mongodbURL ='mongodb://test:test@localhost:27017/burger_builder';
if(runMode === 'PROD'){
    mongodbURL='mongodb://test:test1234@ds263791.mlab.com:63791/burger_builder';
}

db.connect(mongodbURL, { useNewUrlParser: true }, (err) =>{
    assert.equal(null, err);
    console.log(`Successfully connected mongo db instance with the url - ${mongodbURL}`);
});

module.exports = db;