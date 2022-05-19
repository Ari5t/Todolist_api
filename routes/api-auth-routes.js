const express = require('express');

const {
  pasingup, 
  singup,
  login
} = require('../controllers/api-auth-controllers');

const router = express.Router();

router.post('/signup', pasingup, singup);

router.post('/login', login);  

module.exports = router;