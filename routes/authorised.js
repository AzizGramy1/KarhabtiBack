var express = require('express');
var router = express.Router();
const userController = require('../controllers/authorisedController');




/* GET users listing. */
router.get('/message',userController.message );

module.exports = router;