const router = require('express').Router();
const bcrypt = require('bcryptjs');
const UserData = require('../models/datamodels/User');
const UserModel = require('../models/businessmodels/UserModel');
const LoginModel = require('../models/businessmodels/LoginModel');
const jwt = require('jsonwebtoken'); 

router.post('/', (req, res) => {
    //Validate input
    const {error} = LoginModel.ValidateInput(req.body.login);
    if(error) return res.status(400).send(error.details[0].message);

    //Creating business model
    const loginModel = new LoginModel(req.body.login);

    UserData.findOne({username : loginModel.username}).then(
        (userData) =>{
            if(userData){
                bcrypt.compare(loginModel.pwd, userData.passhash, (err, matches) => {
                    if(matches){
                        const sessionToken = jwt.sign({value : userData._id}, config.get('envConfig.jwtsec'), { expiresIn: 60*60*24 });
                        //Convert data object to business object
                        const userResult = new UserModel(userData);
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