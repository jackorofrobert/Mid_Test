const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.get('/:id', authenticate, getProfile);
router.put('/:id', authenticate, updateProfile);

module.exports = router;
