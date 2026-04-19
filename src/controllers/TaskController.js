const taskService = require("../services/TaskService");

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(
      req.params.listId,
      req.user._id.toString(),
      req.body
    );
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.user._id.toString(),
      req.body
    );
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id, req.user._id.toString());
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const moveTask = async (req, res) => {
  try {
    const { targetListId, order } = req.body;
    const task = await taskService.moveTask(
      req.params.id,
      req.user._id.toString(),
      targetListId,
      order
    );
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getListTasks = async (req, res) => {
  try {
    const tasks = await taskService.getListTasks(
      req.params.listId,
      req.user._id.toString()
    );
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createTask, updateTask, deleteTask, moveTask, getListTasks };