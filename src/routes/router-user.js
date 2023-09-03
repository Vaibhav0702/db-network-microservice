const express = require('express');
const router = express.Router();

const userController = require("../controller/controller-user")

router.post("/addUser", userController.addUser);

module.exports = router;