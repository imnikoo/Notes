const express = require('express');
const router = express.Router();

const controller = require('../controllers/notesController.js');

router.get("/api/notes", controller.getAll);
router.get("/api/notes/:id", controller.get);
router.post("/api/notes", controller.post);
router.put("/api/notes/:id", controller.put);
router.delete("/api/notes/:id", controller.remove);

module.exports = router;