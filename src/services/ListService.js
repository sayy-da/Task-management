const listRepository = require("../repositories/list.repository");
const taskRepository = require("../repositories/task.repository");
const boardService = require("./BoardService");

class ListService {
  async createList(boardId, userId, title) {
    if (!title || !title.trim()) throw new Error("Title is required");
    await boardService.verifyOwner(boardId, userId);

    const count = await listRepository.countByBoard(boardId);
    return await listRepository.create({
      title: title.trim(),
      board: boardId,
      order: count,
    });
  }

  async getBoardLists(boardId, userId) {
    await boardService.verifyOwner(boardId, userId);
    return await listRepository.findByBoard(boardId);
  }

  async renameList(listId, userId, title) {
    if (!title || !title.trim()) throw new Error("Title is required");
    const list = await listRepository.findById(listId);
    if (!list) throw new Error("List not found");

    await boardService.verifyOwner(list.board.toString(), userId);
    return await listRepository.updateById(listId, { title: title.trim() });
  }

  async deleteList(listId, userId) {
    const list = await listRepository.findById(listId);
    if (!list) throw new Error("List not found");

    await boardService.verifyOwner(list.board.toString(), userId);
    await taskRepository.deleteByList(listId);
    await listRepository.deleteById(listId);
  }

  async moveList(listId, userId, order) {
    const list = await listRepository.findById(listId);
    if (!list) throw new Error("List not found");

    await boardService.verifyOwner(list.board.toString(), userId);
    return await listRepository.updateById(listId, { order });
  }
}

module.exports = new ListService();