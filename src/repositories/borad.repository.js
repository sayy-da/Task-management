const Board = require("../entity/board.entity");

class BoardRepository {
  async create(data) {
    return await Board.create(data);
  }

  async findByOwner(userId) {
    return await Board.find({ owner: userId }).sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Board.findById(id);
  }

  async deleteById(id) {
    await Board.findByIdAndDelete(id);
  }
}

module.exports = new BoardRepository();