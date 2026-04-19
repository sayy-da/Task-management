const boardService = require("../services/BoardService");

const createBoard = async (req, res) => {
  try {
    const board = await boardService.createBoard(req.user._id.toString(), req.body.title);
    res.status(201).json(board);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getBoards = async (req, res) => {
  try {
    const boards = await boardService.getUserBoards(req.user._id.toString());
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBoard = async (req, res) => {
  try {
    await boardService.deleteBoard(req.params.id, req.user._id.toString());
    res.json({ message: "Board deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createBoard, getBoards, deleteBoard };