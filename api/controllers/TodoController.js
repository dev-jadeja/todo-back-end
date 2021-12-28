/**
 * TodoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getTodos: function (req, res) {
    Todo.find({ board: req.params.id }).exec(function (err, todos) {
      if (err) {
        res.status(500).send({ error: "Database Error" });
      }
      res.status(200).send({ todos: todos });
    });
  },
  addTodo: function (req, res) {
    Todo.create({
      title: req.body.title,
      description: req.body.description,
      board: req.body.board,
    }).exec(function (err) {
      if (err) {
        res.status(500).send({ error: "Database Error" });
      }
      res.status(200).send({ msg: "Added Succesfully" });
    });
  },
  deleteTodo: function (req, res) {
    Todo.destroy({ id: req.params.id }).exec(function (err) {
      if (err) {
        res.status(500).send({ error: "Database Error" });
      }
      res.status(200).send({ msg: "Deleted Succesfully" });
    });
    return false;
  },
  checkTodo: function (req, res) {
    Todo.update({ id: req.body.id }, { completed: req.body.completed }).exec(
      function (err) {
        if (err) {
          res.status(500).send({ error: "Database Error" });
        }
        res.status(200).send({ msg: "Checked Succesfully" });
      }
    );
    return false;
  },
};
