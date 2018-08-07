const router = require('express').Router();
const bcrypt = require('bcryptjs');
const UserData = require('../models/datamodels/User');
const UserModel = require('../models/businessmodels/user');
const LoginModel = require('../models/businessmodels/login');
const jwt = require('jsonwebtoken'); 
const constants  = require('../config/constants');

router.post('/', (req, res) => {
    //Creating business model
    const loginModel = new LoginModel(req.body.login);
    if(loginModel.ValidationErrors) return res.status(400).send(loginModel.ValidationErrors.details[0].message);

    UserData.findOne({username : loginModel.UserName}).then(
        (userData) =>{
            if(userData){
                bcrypt.compare(loginModel.Pwd, userData.passhash, (err, matches) => {
                    if(matches){
                        const sessionToken = jwt.sign({value : userData._id}, constants.JWT_SECRET, { expiresIn: 60*60*24 });
                        //Convert data object to business object
                        const userResult = new UserModel(userData, false);
                        res.json({
                            records: userResult,
                            message: 'Success',
                            isSuccess: true,
                            sessionToken: sessionToken
                        });
                    }
                    else{
                        res.json({
                            records: null,
                            message: 'Failed to authenticate password!',
                            isSuccess: false,
                            sessionToken: null
                        });
                    }
                });
            }
            else{
                res.json({
                    records: null,
                    message: 'Failed to authenticate user name!',
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