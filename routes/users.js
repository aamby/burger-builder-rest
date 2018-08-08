const router = require('express').Router();
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const User = require('../models/datamodels/User');
const UserModel = require('../models/businessmodels/UserModel');

router.post('/addnew', (req, res) => {
    //Creating business model
    const userModel = new UserModel(req.body.user);
    if(userModel.ValidationErrors) return res.status(400).send(userModel.ValidationErrors.details[0].message);
    
    //Setting dataobject from business object
    const user = new User({
        username: userModel.UserName,
        email: userModel.Email,
        passhash: bcrypt.hashSync(userModel.Pwd, 10)
    });

    user.save().then(
        (userData) => {
            //Convert data object to business object before return to ui
            const userResult = new UserModel(userData, false);
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
