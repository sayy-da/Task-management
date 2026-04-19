const List = require("../entity/list.entity");

class ListRepository {
  async create(data) {
    return await List.create(data);
  }

  async findByBoard(boardId) {
    return await List.find({ board: boardId }).sort({ order: 1 });
  }

  async findById(id) {
    return await List.findById(id);
  }

  async updateById(id, data) {
    return await List.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    await List.findByIdAndDelete(id);
  }

  async deleteByBoard(boardId) {
    await List.deleteMany({ board: boardId });
  }

  async countByBoard(boardId) {
    return await List.countDocuments({ board: boardId });
  }
}

module.exports = new ListRepository();