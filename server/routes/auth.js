/**
 * Created by ASUS on 17/11/23.
 */
const express = require('express');
const router = express.Router();

const controller = require('../controllers/authController.js');

router.get("/api/auth/signin", controller.signIn);
router.post("/api/auth/signup", controller.signUp);

module.exports = router;