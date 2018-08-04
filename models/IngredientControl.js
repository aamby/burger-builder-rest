var db = require('../config/db');
var IngredientControlSchema = require('./IngredientControlSchema');

var IngredientControl = db.model('IngredientControl', IngredientControlSchema);

module.exports = IngredientControl;