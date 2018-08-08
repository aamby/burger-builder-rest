const db = require('../../settings/db');
const UserSchema = require('./UserSchema');

const User = db.model('User', UserSchema);

module.exports = User;