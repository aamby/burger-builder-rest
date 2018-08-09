const router = require('express').Router();

//Returning html response
router.get('/', (req,res) => {
    res.render('index', {titleValue: 'Burger Builder',messageHeading: 'REST API', messageBody: 'This is my first NodeJS REST API prototype.'});
});

module.exports = router;
