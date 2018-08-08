const db = require('../../settings/db');
const IngredientControlSchema = require('./IngredientControlSchema');

const IngredientControl = db.model('IngredientControl', IngredientControlSchema);

module.exports = IngredientControl;