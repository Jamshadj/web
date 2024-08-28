
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const upload = require('../multer');

const { validationResult } = require('express-validator');
const { validateSignup, validateLogin } = require('../middleware/validators');

const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log();
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/signup', validateSignup,checkValidationErrors, userController.postSignup);

router.post('/login', validateLogin, userController.postLogin);

router.get('/logout', userController.getLogout);

router.get('/checkAuth', userController.checkAuth);

router.post('/editProfile', upload.single('file'), userController.editProfile);

module.exports = router;
