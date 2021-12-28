/**
 * BoardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Todo = require("../models/Todo");

module.exports = {
  getBoards: function (req, res) {
    Board.find({}).exec(function (err, boards) {
      if (err) {
        res.status(500).send({ error: "Database Error" });
      }
      res.status(200).send({ boards: boards });
    });
  },
  deleteBoard: function (req, res) {
    Board.destroy({ id: req.params.id }).exec(function (err) {
      if (err) {
        console.log(err);
        res.status(500).send({ error: "Database Error" });
      }
      res.status(200).send({ msg: "Deleted Succesfully" });
    });
    return false;
  },
  addBoard: function (req, res) {
    Board.create({ boardName: req.body.boardName }).exec(function (err) {
      if (err) {
        res.status(500).send({ error: "Database Error" });
      }
      res.status(200).send({ msg: "Added Succesfully" });
    });
  },
};
