var db = require('../config/db');

var IngredientControlSchema = db.Schema({
    label: {type: String, require: true},
    type: {type: String, require: true},
    rate:{type: Number, require: true},
    createdon:{type: Date, default: Date.now},
    createdby:{type: db.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = IngredientControlSchema;