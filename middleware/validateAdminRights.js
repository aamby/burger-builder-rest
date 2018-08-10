var User = require('../models/datamodels/User');

module.exports = (req, res, next) => {
    if(!req.user.isadmin) res.status(403).send('Access forbidden! Only admin can do this operation.'); 
    next();
};