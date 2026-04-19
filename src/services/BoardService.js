const boardRepository = require("../repositories/borad.repository");
const listRepository = require("../repositories/list.repository");
const taskRepository = require("../repositories/task.repository");

class BoardService {
  async createBoard(userId, title) {
    if (!title || !title.trim()) throw new Error("Title is required");
    const board = await boardRepository.create({ title: title.trim(), owner: userId });

    // Create default lists: Todo, In Progress, Done
    const defaultLists = ["Todo", "In Progress", "Done"];
    for (let i = 0; i < defaultLists.length; i++) {
      await listRepository.create({
        title: defaultLists[i],
        board: board._id,
        order: i
      });
    }

    return board;
  }

  async getUserBoards(userId) {
    return await boardRepository.findByOwner(userId);
  }

  async deleteBoard(boardId, userId) {
    const board = await boardRepository.findById(boardId);
    if (!board) throw new Error("Board not found");
    if (board.owner.toString() !== userId) throw new Error("Not authorized");

    await taskRepository.deleteByBoard(boardId);
    await listRepository.deleteByBoard(boardId);
    await boardRepository.deleteById(boardId);
  }

  async verifyOwner(boardId, userId) {
    const board = await boardRepository.findById(boardId);
    if (!board) throw new Error("Board not found");
    if (board.owner.toString() !== userId) throw new Error("Not authorized");
    return board;
  }
}

module.exports = new BoardService();