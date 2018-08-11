const User = require('../models/datamodels/User');
const UserModel = require('../models/businessmodels/UserModel');
const router = require('express').Router();
const _ = require('lodash');

router.post('/registeruser', (req, res) => {
    //Validate input
    const {error} = UserModel.ValidateInput(req.body.user);
    if(error) return res.status(400).send(error.details[0].message);

    //Creating business model
    const userModel = new UserModel(req.body.user);   
    (async ()=>{
        try{
            //Setting dataobject from business object by picking correct properties
            const user = new User(_.pick(userModel, ['id', 'username', 'email', 'isadmin']));
            user.passhash = await userModel.getPassHash();
            const savedData = await user.save();
            res.json({records: new UserModel(savedData),message: 'Success',isSuccess: true});
        }
        catch(err){
            res.status(500).send(`Failed to save! Error: ${err.message}`);
        }
    })();    
});

module.exports = router;
