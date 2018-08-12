const db = require('mongoose');
const assert = require('assert');
const config = require('config');
const debug = require('debug')('app:db');

const dbUserName = config.get('envConfig.dbUserName');
const dbPwd = config.get('envConfig.dbPwd');
let mongodbURL=`${config.get('mongodbURL.dbType')}://${dbUserName}:${dbPwd}@${config.get('mongodbURL.dbServer')}/${config.get('mongodbURL.dbName')}`;

//Using promise
db.connect(mongodbURL, { useNewUrlParser: true })
.then(() => debug(`Successfully connected mongo db instance with the url - ${mongodbURL}`))
.catch(err => debug('Failed connected database'));

module.exports = db;

//PROD-
// export NODE_ENV="production"
// export bb_dbUserName="test"
// export bb_dbPwd="test1234"
// export PORT=4545
// export DEBUG= 
// export JWTSEC= 'this is a secret'

//DEV-
// export NODE_ENV="development"
// export bb_dbUserName="test"
// export bb_dbPwd="test"
// export PORT=4343
// export DEBUG=app:* or app:startup, app:db
// export JWTSEC= 'this is a secret'
