const taskRepository = require("../repositories/task.repository");
const listRepository = require("../repositories/list.repository");
const boardService = require("./BoardService");

class TaskService {
  async createTask(listId, userId, data) {
    const { title, description, priority, dueDate } = data;
    if (!title || !title.trim()) throw new Error("Title is required");

    const list = await listRepository.findById(listId);
    if (!list) throw new Error("List not found");

    await boardService.verifyOwner(list.board.toString(), userId);

    const count = await taskRepository.countByList(listId);
    return await taskRepository.create({
      title: title.trim(),
      description: description || "",
      priority: priority || "medium",
      dueDate: dueDate || null,
      list: listId,
      board: list.board,
      order: count,
    });
  }

  async updateTask(taskId, userId, data) {
    const task = await taskRepository.findById(taskId);
    if (!task) throw new Error("Task not found");

    await boardService.verifyOwner(task.board.toString(), userId);

    const allowed = ["title", "description", "priority", "dueDate"];
    const updates = {};
    allowed.forEach((field) => {
      if (data[field] !== undefined) updates[field] = data[field];
    });

    return await taskRepository.updateById(taskId, updates);
  }

  async deleteTask(taskId, userId) {
    const task = await taskRepository.findById(taskId);
    if (!task) throw new Error("Task not found");

    await boardService.verifyOwner(task.board.toString(), userId);
    await taskRepository.deleteById(taskId);
  }

  async moveTask(taskId, userId, targetListId, order) {
    const task = await taskRepository.findById(taskId);
    if (!task) throw new Error("Task not found");

    const targetList = await listRepository.findById(targetListId);
    if (!targetList) throw new Error("Target list not found");

    await boardService.verifyOwner(task.board.toString(), userId);

    let newOrder = order;
    if (newOrder === undefined || newOrder === null) {
      newOrder = await taskRepository.countByList(targetListId);
    }

    return await taskRepository.updateById(taskId, {
      list: targetListId,
      order: newOrder,
    });
  }

  async getListTasks(listId, userId) {
    const list = await listRepository.findById(listId);
    if (!list) throw new Error("List not found");

    await boardService.verifyOwner(list.board.toString(), userId);
    return await taskRepository.findByList(listId);
  }
}

module.exports = new TaskService();