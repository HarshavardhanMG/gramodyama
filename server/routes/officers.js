const express = require('express');
const router = express.Router();
const officerController = require('../controllers/officerController');
const auth = require('../middleware/auth');
// Define routes
router.get('/', officerController.getOfficers);
router.get('/available', officerController.getAvailableOfficers);
router.post('/book', officerController.bookAppointment);
router.get('/', auth, officerController.getOfficers);
router.get('/available', auth, officerController.getAvailableOfficers);
router.post('/book', auth, officerController.bookAppointment);

module.exports = router;  // Make sure to export the router 