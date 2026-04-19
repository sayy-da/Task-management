const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTask,
  deleteTask,
  moveTask,
  getListTasks,
} = require("../controllers/TaskController");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

// List-scoped
router.get("/list/:listId", getListTasks);
router.post("/list/:listId", createTask);

// Task-specific
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/move", moveTask);

module.exports = router;