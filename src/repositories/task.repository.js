const Task = require("../entity/task.entity");

class TaskRepository {
  async create(data) {
    return await Task.create(data);
  }

  async findByList(listId) {
    return await Task.find({ list: listId }).sort({ order: 1 });
  }

  async findByBoard(boardId) {
    return await Task.find({ board: boardId }).sort({ order: 1 });
  }

  async findById(id) {
    return await Task.findById(id);
  }

  async updateById(id, data) {
    return await Task.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    await Task.findByIdAndDelete(id);
  }

  async deleteByList(listId) {
    await Task.deleteMany({ list: listId });
  }

  async deleteByBoard(boardId) {
    await Task.deleteMany({ board: boardId });
  }

  async countByList(listId) {
    return await Task.countDocuments({ list: listId });
  }
}

module.exports = new TaskRepository();