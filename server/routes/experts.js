const express = require('express');
const router = express.Router();
const expertController = require('../controllers/expertController');
const auth = require('../middleware/auth');
// Define routes
router.get('/', expertController.getAllExperts); // This should match the client call
router.get('/:id', expertController.getExpertById);
router.get('/', auth, expertController.getAllExperts);
router.get('/:id', auth, expertController.getExpertById);

module.exports = router;