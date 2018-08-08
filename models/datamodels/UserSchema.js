const db = require('../../config/db');

const UserSchema = db.Schema({
    username: {type: String, require: true},
    email: {type: String, require: true},
    passhash:{type: String, require: true},
    createdate:{type: Date, default: Date.now}
}, {collection : 'users'});

module.exports = UserSchema;