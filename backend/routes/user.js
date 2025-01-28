const express = require('express');
const router = express.Router();
const authController = require('../controllers/user');
const auth = require('../middleware/auth')

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.delete('/delete/:id', auth, authController.deleteUser);


module.exports = router;
