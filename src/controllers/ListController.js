const listService = require("../services/ListService");

const createList = async (req, res) => {
  try {
    const list = await listService.createList(
      req.params.boardId,
      req.user._id.toString(),
      req.body.title
    );
    res.status(201).json(list);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getLists = async (req, res) => {
  try {
    const lists = await listService.getBoardLists(
      req.params.boardId,
      req.user._id.toString()
    );
    res.json(lists);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const renameList = async (req, res) => {
  try {
    const list = await listService.renameList(
      req.params.id,
      req.user._id.toString(),
      req.body.title
    );
    res.json(list);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteList = async (req, res) => {
  try {
    await listService.deleteList(req.params.id, req.user._id.toString());
    res.json({ message: "List deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const moveList = async (req, res) => {
  try {
    const list = await listService.moveList(
      req.params.id,
      req.user._id.toString(),
      req.body.order
    );
    res.json(list);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createList, getLists, renameList, deleteList, moveList };