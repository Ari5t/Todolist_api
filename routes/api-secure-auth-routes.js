const express = require('express');

const router = express.Router();

const {
  profile
} = require('../controllers/api-secure-auth-controllers');

router.get('/profile', profile);

module.exports = router;