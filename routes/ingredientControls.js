var router = require('express').Router();
var IngredientControl = require('../models/IngredientControl');

router.post('/getall', (req, res) => {
    IngredientControl.find({createdby:req.user}).then(
        (newIngredient) => {
            res.json({
                records: newIngredient,
                message: 'success',
                isSuccess: true,
            });
        },
        (err) =>{
            res.send(500, err.message);
        }
    );
});

router.post('/addnew', (req, res) => {
    var ingredientControl = new IngredientControl({
        label: req.body.ingredientControl.label,
        type: req.body.ingredientControl.type,
        rate: req.body.ingredientControl.rate,
        createdby: req.user
    });

    ingredientControl.save().then(
        (newIngredient) => {
            res.json({
                records: newIngredient,
                message: 'success',
                isSuccess: true,
            });
        },
        (err) =>{
            res.send(500, err.message);
        }
    );
});

router.post('/edit', (req, res) => {
    IngredientControl.findOne({_id:req.body.ingredientControl._id}).then(
        (ingredient) =>{ 
            ingredient.label = req.body.ingredientControl.label;
            ingredient.type = req.body.ingredientControl.type;
            ingredient.rate = req.body.ingredientControl.rate;

            ingredient.save().then(
                (newIngredient) => {
                    res.json({
                        records: newIngredient,
                        message: 'success',
                        isSuccess: true,
                    });
                },
                (err) =>{
                    res.send(500, err.message);
                }
            );
        },
        (err) =>{
            res.send(500, err.message);
        }
    );
});

router.post('/delete', (req, res) => {
    IngredientControl.findOne({_id:req.body.ingredientControl._id}).then(
        (ingredient) =>{ 
            ingredient.remove().then(
                () => {
                    res.json({
                        records: ingredient,
                        message: 'success',
                        isSuccess: true,
                    });
                },
                (err) =>{
                    res.send(500, err.message);
                }
            );
        }
    );
});

// router.get('/', (req, res) => {
//     console.log(req.user);
//     IngredientControl.find({createdby:req.user}).then(
//         (ingredients) =>{ 
//             res.json(ingredients);
//         });
// });

//http://localhost:4242/api/ingredientcontrols/5b64900cb2f15002f63917a2
// router.put('/:id', (req, res) => {
//     IngredientControl.findOne({_id:req.params.id, createdby: req.user}).then(
//         (ingredient) =>{ 
//             ingredient.label = req.body.ingredientControl.label;
//             ingredient.type = req.body.ingredientControl.type;
//             ingredient.rate = req.body.ingredientControl.rate;

//             ingredient.save().then(
//                 (newIngredient) => {
//                     res.json({
//                         records: newIngredient,
//                         message: 'success',
//                         isSuccess: true,
//                     });
//                 },
//                 (err) =>{
//                     res.send(500, err.message);
//                 }
//             );
//         },
//         (err) =>{
//             res.send(500, err.message);
//         }
//     );
// });

// router.delete('/:id', (req, res) => {
//     IngredientControl.findOne({_id:req.params.id, createdby: req.user}).then(
//         (ingredient) =>{ 
//             ingredient.remove().then(
//                 () => {
//                     res.json({
//                         records: ingredient,
//                         message: 'success',
//                         isSuccess: true,
//                     });
//                 },
//                 (err) =>{
//                     res.send(500, err.message);
//                 }
//             );
//         }
//     );
// });

module.exports = router;
