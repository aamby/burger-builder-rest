var jwt = require('jsonwebtoken');
var User = require('../models/datamodels/User');

module.exports = (req, res, next) => {
    const sessionToken = req.headers.authorization; 
    if(!req.body.user && sessionToken){
        //jwt check
        jwt.verify(sessionToken, config.get('envConfig.jwtsec'), (err, decodedId) =>{
            if(err){
                res.send(500, 'Authorization failed! Error -' + err.message);
            }

            if(decodedId){
                User.findOne({_id : decodedId.value}).then((user) =>{
                    req['user'] = user;
                    next();
                },
                (err) => {
                    res.send(401, 'Authentication failed! Error -' + err.message);
                });
            }
            else{
                res.send(401, 'Authentication failed!');
            }
        });
    }
    else{
        next();
    }   
};

