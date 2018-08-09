const router = require('express').Router();
const Joi = require('joi');
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
    const {error} = UserModel.ValidateInput(req.body.user);
    if(error) return res.status(400).send(error.details[0].message);

    //Creating business model
    const ingredientControlModel = new IngredientControlModel(req.body.ingredientControl);
    
    //Setting dataobject from business object
    const ingredientControl = new IngredientControl({
        label: ingredientControlModel.Label,
        type: ingredientControlModel.Type,
        rate: ingredientControlModel.Rate,
        createdby: req.user
    });

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
    const {error} = UserModel.ValidateInput(req.body.user);
    if(error) return res.status(400).send(error.details[0].message);

    //Creating business model
    const ingredientControlModel = new IngredientControlModel(req.body.ingredientControl);
  
    //Setting dataobject from business object after finding existing item
    IngredientControl.findOne({_id:req.body.ingredientControl.id}).then(
        (ingredient) =>{ 
            ingredient.label = ingredientControlModel.Label;
            ingredient.type = ingredientControlModel.Type;
            ingredient.rate = ingredientControlModel.Rate;

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
