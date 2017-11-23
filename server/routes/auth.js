/**
 * Created by ASUS on 17/11/23.
 */
const express = require('express');
const router = express.Router();

const controller = require('../controllers/authController.js');

router.post("/api/login", controller.login);
router.post("/api/signup", controller.signUp);

module.exports = router;