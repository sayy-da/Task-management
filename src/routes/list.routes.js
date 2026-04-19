const express = require("express");
const router = express.Router();
const { createList, getLists, renameList, deleteList, moveList } = require("../controllers/ListController");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

// Board-scoped
router.get("/board/:boardId", getLists);
router.post("/board/:boardId", createList);

// List-specific
router.patch("/:id", renameList);
router.delete("/:id", deleteList);
router.patch("/:id/move", moveList);

module.exports = router;