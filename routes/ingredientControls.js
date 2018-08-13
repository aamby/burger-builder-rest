const router = require('express').Router();
const _ = require('lodash');
const IngredientControl = require('../models/datamodels/IngredientControl');
const IngredientControlModel = require('../models/businessmodels/IngredientControlModel');
const validateSession  = require('../middleware/validateSession');
const validateAdminRights  = require('../middleware/validateAdminRights');

router.post('/getall', validateSession, (req, res) => {
    (async ()=>{
        try{
            const ingredientsData = await IngredientControl.find({createdby:req.user});
            const ingredientsResult = IngredientControlModel.CreateList(ingredientsData);
            res.json({records: ingredientsResult,message: 'Success',isSuccess: true});
        }
        catch(err){
            res.status(500).send(`Failed to get! Error: ${err.message}`);
        }
    })();
});

router.post('/addnew', validateSession, (req, res) => {
    //Validate input
    const {error} = IngredientControlModel.ValidateInput(req.body.ingredientControl);
    if(error) return res.status(400).send(error.details[0].message);
    //Creating business model
    const ingredientControlModel = new IngredientControlModel(req.body.ingredientControl, req.user);   
    //Setting dataobject from business object
    const ingredientControlData = new IngredientControl(_.pick(ingredientControlModel, ['id', 'label', 'type', 'rate', 'createdby']));
    (async ()=>{
        try{
            const savedData = await ingredientControlData.save();
            res.json({records: new IngredientControlModel(savedData),message: 'Success',isSuccess: true});
        }
        catch(err){
            res.status(500).send(`Failed to save! Error: ${err.message}`);
        }
    })();
});

router.post('/edit', validateSession, (req, res) => {
    //Validate input
    const {error} = IngredientControlModel.ValidateInput(req.body.ingredientControl);
    if(error) return res.status(400).send(error.details[0].message);

    //Creating business model
    const ingredientControlModel = new IngredientControlModel(req.body.ingredientControl);
    (async ()=>{
        try{
            const updatedData = await IngredientControl.findOneAndUpdate({id:ingredientControlModel.id},{
            $set:{
                label: ingredientControlModel.label,
                type: ingredientControlModel.type,
                rate: ingredientControlModel.rate
            }}, {new: true});
            
            if(updatedData){
                res.json({records: new IngredientControlModel(updatedData),message: 'Success',isSuccess: true});
            }
            else{
                res.status(500).send('Failed to find record!');
            }
        }
        catch(err){
            res.status(500).send(`Failed to edit! Error: ${err.message}`);
        }
    })();
});

router.post('/delete', [validateSession, validateAdminRights], (req, res) => {
    (async ()=>{
        try{
            const foundAndDeleted = await IngredientControl.findOneAndRemove({id:req.body.ingredientControl.id});
            if(foundAndDeleted){
                res.json({records: {},message: 'Success',isSuccess: true});
            }   
            else{
                res.status(500).send('Record not found to delete!');
            }
        }
        catch(err){
            res.status(500).send(`Failed to delete! Error: ${err.message}`);
        }
    })();
});

module.exports = router;
