const router = require('express').Router();
const bcrypt = require('bcryptjs');
const config = require('config');
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
    (async ()=>{
        try{
            const userData = await UserData.findOne({username : loginModel.username});
            const matches = await bcrypt.compare(loginModel.pwd, userData.passhash);
            if(matches){
                //Convert data object to business object
                const userResult = new UserModel(userData);
                const secret = config.get('envConfig.jwtsec');
                const sessionToken = jwt.sign({value:userResult}, secret, { expiresIn: 60*60*24 });
                res.header('Authorization', sessionToken)
                .json({
                    records: userResult,
                    message: 'Success',
                    isSuccess: true
                });
            }
            else{
                res.status(403).send('Authorization failed! Invalid Token.');
            }
        }
        catch(err){
            res.status(403).send(`Authorization failed! Invalid Token. Error: ${err.message}`);
        }
    })();

});

module.exports = router;