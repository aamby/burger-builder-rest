var db = require('../config/db');

var UserSchema = db.Schema({
    username: {type: String, require: true},
    email: {type: String, require: true},
    passhash:{type: String, require: true},
    createdate:{type: Date, default: Date.now}
});

module.exports = UserSchema;