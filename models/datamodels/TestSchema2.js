const db = require('../../settings/db');

const TestSchema2 = db.Schema({
    id: {type: Number, require: true},
    label: {type: String, require: true},
    createdate:{type: Date, default: Date.now},
    createdby:{type: db.Schema.Types.ObjectId, ref: 'User'}
}, {collection : 'test2'});

module.exports = TestSchema2;