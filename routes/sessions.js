var router = require('express').Router();
var bcrypt = require('bcryptjs');
var User = require('../models/User');
var jwt = require('jsonwebtoken'); 
var constants  = require('../config/constants');

router.post('/', (req, res) => {
    User.findOne({username : req.body.login.username}).then(
        (user) =>{
            if(user){
                bcrypt.compare(req.body.login.pwd, user.passhash, (err, matches) => {
                    if(matches){
                        var sessionToken = jwt.sign({value : user._id}, constants.JWT_SECRET, { expiresIn: 60*60*24 });
                        res.json({
                            records: user,
                            message: 'success',
                            isSuccess: true,
                            sessionToken: sessionToken
                        });
                    }
                    else{
                        res.json({
                            records: null,
                            message: 'failed to authenticate password!',
                            isSuccess: false,
                            sessionToken: null
                        });
                    }
                });
            }
            else{
                res.json({
                    records: null,
                    message: 'failed to authenticate user name!',
                    isSuccess: false,
                    sessionToken: null
                });
            }
        },
        (err) => {
            res.send(401, 'Authentication failed! Error -' + err.message);
    });
});

module.exports = router;