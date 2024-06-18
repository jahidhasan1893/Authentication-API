const router = require('express').Router();

const signoutController = require('../controllers/signoutController');

router.get('/', signoutController.getSignout);


module.exports = router;