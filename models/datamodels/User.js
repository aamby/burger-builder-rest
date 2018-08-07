const db = require('../../config/db');
const UserSchema = require('./UserSchema');

const User = db.model('User', UserSchema);

module.exports = User;