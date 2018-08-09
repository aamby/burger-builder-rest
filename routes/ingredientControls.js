const router = require('express').Router();
const _ = require('lodash');
const IngredientControl = require('../models/datamodels/IngredientControl');
const IngredientControlModel = require('../models/businessmodels/IngredientControlModel');

router.post('/getall', (req, res) => {
    IngredientControl.find({createdby:req.user}).then(
        (ingredientsData) => {
            //Creating business object collection
            const ingredientsResult = IngredientControlModel.CreateList(ingredientsData);

            res.json({
                records: ingredientsResult,
                message: 'Success',
                isSuccess: true,
            });
        },
        (err) =>{
            res.send(500, err.message);
        }
    );
});

router.post('/addnew', (req, res) => {
    //Validate input
    const {error} = IngredientControlModel.ValidateInput(req.body.ingredientControl);
    if(error) return res.status(400).send(error.details[0].message);

    //Creating business model
    const ingredientControlModel = new IngredientControlModel(req.body.ingredientControl, req.user);
    
    //Setting dataobject from business object
    const ingredientControl = new IngredientControl(_.pick(ingredientControlModel, ['label', 'type', 'rate', 'createdby']));

    ingredientControl.save().then(
        (ingredientData) => {
            //Creating business object
            const ingredientResult = new IngredientControlModel(ingredientData);
            res.json({
                records: ingredientResult,
                message: 'Success',
                isSuccess: true,
            });
        },
        (err) =>{
            res.send(500, err.message);
        }
    );
});

router.post('/edit', (req, res) => {
    //Validate input
    const {error} = IngredientControlModel.ValidateInput(req.body.user);
    if(error) return res.status(400).send(error.details[0].message);

    //Creating business model
    const ingredientControlModel = new IngredientControlModel(req.body.ingredientControl);
  
    //Setting dataobject from business object after finding existing item
    IngredientControl.findOne({_id:ingredientControlModel.id}).then(
        (ingredient) =>{ 
            ingredient.label = ingredientControlModel.label;
            ingredient.type = ingredientControlModel.type;
            ingredient.rate = ingredientControlModel.rate;

            ingredient.save().then(
                (ingredientData) => {
                    //Creating business object
                    const ingredientResult = new IngredientControlModel(ingredientData);
                    res.json({
                        records: ingredientResult,
                        message: 'Success',
                        isSuccess: true,
                    });
                },
                (err) =>{
                    res.send(500, err.message);
                }
            );
        },
        (err) =>{
            res.send(500, 'Invalid record to edit.');
        }
    );
});

router.post('/delete', (req, res) => {
    IngredientControl.findOne({_id:req.body.ingredientControl.id}).then(
        (ingredientData) =>{ 
            ingredientData.remove().then(
                () => {
                    res.json({
                        records: {},
                        message: 'Success',
                        isSuccess: true,
                    });
                },
                (err) =>{
                    res.send(500, err.message);
                }
            );
        },
        (err) =>{
            res.send(500, 'Invalid record to delete.');
        }
    );
});

module.exports = router;
