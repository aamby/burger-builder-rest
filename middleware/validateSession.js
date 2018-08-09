var jwt = require('jsonwebtoken');
const config = require('config');
var User = require('../models/datamodels/User');

module.exports = (req, res, next) => {
    const sessionToken = req.headers.authorization; 
    if(!req.body.user && sessionToken){
        //jwt check
        jwt.verify(sessionToken, config.get('envConfig.jwtsec'), (err, payload) =>{
            if(err){
                res.send(500, 'Authorization failed! Error -' + err.message);
            }

            if(payload){
                User.findOne({_id : payload.value.id}).then((userData) =>{
                    req['user'] = userData;
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

