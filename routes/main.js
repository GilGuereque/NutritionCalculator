const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

//Routes
router.get('/', homeController.getIndex);

// Export module
module.exports = router;
