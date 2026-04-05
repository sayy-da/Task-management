export class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  createTask = async (req, res) => {
    try {
      const task = await this.taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  getTasks = async (req, res) => {
    try {
      const { status } = req.query;
      const tasks = await this.taskService.getTasks(status);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  updateTask = async (req, res) => {
    try {
      const task = await this.taskService.updateTask(
        req.params.id,
        req.body
      );
      res.json(task);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  deleteTask = async (req, res) => {
    try {
      await this.taskService.deleteTask(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
}