const express = require("express");
const router = express.Router();
const { createBoard, getBoards, deleteBoard } = require("../controllers/BoardController");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

router.get("/", getBoards);
router.post("/", createBoard);
router.delete("/:id", deleteBoard);

module.exports = router;