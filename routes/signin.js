const router = require('express').Router();

const signinController = require('../controllers/signinController');


router.get('/', signinController.getSignin);

router.post('/', signinController.postSignin);

module.exports = router;