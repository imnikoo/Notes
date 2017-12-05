const express = require('express');
const router = express.Router();

const controller = require('../controllers/notesController.js');
const authController = require('../controllers/authController');

router.get("/api/notes", authController.isAuthenticated, controller.getAll);
router.get("/api/notes/:id", authController.isAuthenticated, controller.get);
router.get("/api/notes/user/:id", authController.isAuthenticated, controller.getByUserId);
router.post("/api/notes", authController.isAuthenticated, controller.post);
router.put("/api/notes/:id", authController.isAuthenticated, controller.put);
router.delete("/api/notes/:id", authController.isAuthenticated, controller.remove);

module.exports = router;