const express = require('express');
const router = express.Router();
const authController = require('../controllers/user');


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/test', authController.test);

module.exports = router;
