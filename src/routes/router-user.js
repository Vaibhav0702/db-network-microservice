const express = require('express');
const router = express.Router();

const authenticate = require("../middleware/authenticate")


const userController = require('../controller/controller-user');

// Register route
router.post('/register', userController.register);

// Login route
router.post('/login', userController.login);

//update route
router.post('/update/:id', authenticate ,userController.update);


module.exports = router;
