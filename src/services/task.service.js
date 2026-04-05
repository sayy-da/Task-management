export class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async createTask(data) {
    if (!data.title) {
      throw new Error("Title is required");
    }
    return await this.taskRepository.create(data);
  }

  async getTasks(status) {
    const filter =
      status && status !== "All" ? { status } : {};
    return await this.taskRepository.findAll(filter);
  }

  async updateTask(id, data) {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new Error("Task not found");

    return await this.taskRepository.update(id, data);
  }

  async deleteTask(id) {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new Error("Task not found");

    return await this.taskRepository.delete(id);
  }
}