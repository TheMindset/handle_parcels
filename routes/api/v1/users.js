var express = require('express');
var router = express.Router();
const usersControllers = require('../../../controllers/users_controllers')

/* GET users listing. */
router.post('/register', usersControllers.register)
router.post('/login', usersControllers.login)

module.exports = router;
