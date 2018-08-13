const router = require('express').Router();
const debug = require('debug')('app:router');
const Transaction = require('mongoose-transactions');
const transaction = new Transaction();
const Test1 = require('../models/datamodels/Test1');
const Test2 = require('../models/datamodels/Test2');
const IngredientControl = require('../models/datamodels/IngredientControl');
const validateSession  = require('../middleware/validateSession');

router.post('/test_transaction', validateSession, (req, res) => {
    (async ()=>{
        try{
            const test1_id = transaction.insert('Test1', {'id': req.user.id, 'username': req.user.username});
            debug('Transaction 1: insert into test1, test1_id: ' + test1_id);

            const test2_id = transaction.insert('Test2', {'id': req.body.ingredientControl.id, 'label': req.body.ingredientControl.label});
            debug('Transaction 2: insert into test2, test2_id: ' + test2_id);

            //This will fail transaction on demand basis
            const updatedData = await IngredientControl.findOne({id:req.body.ingredientControl.id});
            if(updatedData){
                updatedData.label= req.body.ingredientControl.label;
                updatedData.type= req.body.ingredientControl.type;
                updatedData.rate= req.body.ingredientControl.rate;
            }
            transaction.update('IngredientControl', updatedData._id, updatedData, { new: true });
            debug('Transaction 3: update IngredientControl, _id:' + updatedData._id);       

            const final = await transaction.run();
            debug('Transaction completed successfully.');
            res.json({records: final ,message: 'Success',isSuccess: true});
        }
        catch(err){
            const rollbackObj = await transaction.rollback().catch(console.error);
            res.status(500).send('Transaction failed!');
        }
        transaction.clean();
    })();
});

module.exports = router;
