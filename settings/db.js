const db = require('mongoose');
const assert = require('assert');
var constants  = require('./constants');
const config = require('config');
const debug = require('debug')('app:db');

const dbUserName = config.get('envConfig.dbUserName') || constants.DEFAULT_DBUNAME;
const dbPwd = config.get('envConfig.dbPwd') || constants.DEFAULT_DBPWD;
let mongodbURL=`${config.get('mongodbURL.dbType')}://${dbUserName}:${dbPwd}@${config.get('mongodbURL.dbServer')}/${config.get('mongodbURL.dbName')}`;

db.connect(mongodbURL, { useNewUrlParser: true }, (err) =>{
    assert.equal(null, err);
    debug(`Successfully connected mongo db instance with the url - ${mongodbURL}`);
});

module.exports = db;

//PROD-
// export NODE_ENV="production"
// export bb_dbUserName="test"
// export bb_dbPwd="test1234"
// export PORT=4545
// export DEBUG= 

//DEV-
// export NODE_ENV="development"
// export bb_dbUserName="test"
// export bb_dbPwd="test"
// export PORT=4343
// export DEBUG=app:* or app:startup, app:db
