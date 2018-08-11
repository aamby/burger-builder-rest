var jwt = require('jsonwebtoken');
const config = require('config');
var User = require('../models/datamodels/User');

module.exports = (req, res, next) => {
    const sessionToken = req.headers.authorization; 
    if(!sessionToken) res.send(400, 'Authorization failed! No valid token is found!'); 

    (async ()=>{
        try{
            const payload = await jwt.verify(sessionToken, config.get('envConfig.jwtsec'));
            const userData = await User.findOne({id : payload.value.id});
            if(userData){
                req['user'] = userData;
                next();
            }
            else{
                res.status(401).send('Authentication failed!');
            }
        }
        catch(err){
            res.status(401).send(`Authentication failed! Error: ${err.message}`);
        }
    })();
};

