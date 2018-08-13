const db = require('../../settings/db');
const TestSchema1 = require('./TestSchema1');

const Test1 = db.model('Test1', TestSchema1);

module.exports = Test1;