const db = require('../../settings/db');
const TestSchema2 = require('./TestSchema2');

const Test2 = db.model('Test2', TestSchema2);

module.exports = Test2;