const db = require('../../settings/db');

const TestSchema1 = db.Schema({
    id: {type: Number, require: true},
    username: {type: String, require: true},
    createdate:{type: Date, default: Date.now}
}, {collection : 'test1'});

module.exports = TestSchema1;