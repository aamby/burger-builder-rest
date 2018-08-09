const router = require('express').Router();
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const User = require('../models/datamodels/User');
const UserModel = require('../models/businessmodels/UserModel');

router.post('/addnew', (req, res) => {
    //Validate input
    const {error} = UserModel.ValidateInput(req.body.user);
    if(error) return res.status(400).send(error.details[0].message);

    //Creating business model
    const userModel = new UserModel(req.body.user);   
    
    //Setting dataobject from business object
    const user = new User({
        username: userModel.UserName,
        email: userModel.Email,
        passhash: bcrypt.hashSync(userModel.Pwd, 10)
    });

    user.save().then(
        (userData) => {
            //Convert data object to business object before return to ui
            const userResult = new UserModel(userData);
            res.json({
                records: userResult,
                message: 'Success',
                isSuccess: true
            });
        },
        (err) =>{
            res.send(500, err.message);
        }
    );
});

module.exports = router;
