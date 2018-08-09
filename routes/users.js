const User = require('../models/datamodels/User');
const UserModel = require('../models/businessmodels/UserModel');
const router = require('express').Router();
const _ = require('lodash');

router.post('/addnew', (req, res) => {
    //Validate input
    const {error} = UserModel.ValidateInput(req.body.user);
    if(error) return res.status(400).send(error.details[0].message);

    //Creating business model
    const userModel = new UserModel(req.body.user);   
    
    //Setting dataobject from business object by picking correct properties
    const user = new User(_.pick(userModel, ['username', 'email', 'passhash']));

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
