var db = require('../config/db');
var UserSchema = require('./UserSchema');

var User = db.model('User', UserSchema);

module.exports = User;