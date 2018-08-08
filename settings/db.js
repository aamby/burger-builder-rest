const db = require('mongoose');
const assert = require('assert');
var constants  = require('./constants');
const config = require('config');

const runMode = config.get('envConfig.envMode') || constants.PROD_ENV; //to know whether it is Dev/QA/Production environment
if(runMode === constants.PROD_ENV){
    
}

let mongodbURL=`${config.get('mongodbURL.dbType')}://${config.get('envConfig.dbUserName')}:${config.get('envConfig.dbPwd')}@${config.get('mongodbURL.dbServer')}/${config.get('mongodbURL.dbName')}`;

db.connect(mongodbURL, { useNewUrlParser: true }, (err) =>{
    assert.equal(null, err);
    console.log(`Successfully connected mongo db instance with the url - ${mongodbURL}`);
});

module.exports = db;

//PROD-
// export NODE_ENV="production"
// export bb_dbUserName="test"
// export bb_dbUserpwd="test1234"
// export PORT=4545

//DEV-
// export NODE_ENV="development"
// export bb_dbUserName="test"
// export bb_dbUserpwd="test"
// export PORT=4343
