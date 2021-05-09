const express = require('express');
const HomeController = require('../controllers/home.controller')
const router = express.Router();
/* GET users listing. */
router.get('/', HomeController.find);
// router.post('/', UserController.create);
// router.post('/delete', UserController.delete);

module.exports = router;
