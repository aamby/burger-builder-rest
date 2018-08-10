const db = require('../../settings/db');

const UserSchema = db.Schema({
    username: {type: String, require: true},
    email: {type: String, require: true},
    passhash:{type: String, require: true},
    isadmin:{type: Boolean, default: false},
    createdate:{type: Date, default: Date.now}
}, {collection : 'users'});

module.exports = UserSchema;