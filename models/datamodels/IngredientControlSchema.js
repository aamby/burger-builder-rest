const db = require('../../settings/db');

const IngredientControlSchema = db.Schema({
    id: {type: Number, require: true},
    label: {type: String, require: true},
    type: {type: String, require: true},
    rate:{type: Number, require: true},
    createdate:{type: Date, default: Date.now},
    createdby:{type: db.Schema.Types.ObjectId, ref: 'User'}
}, {collection : 'ingredientcontrols'});

module.exports = IngredientControlSchema;