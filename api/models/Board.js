/**
 * Board.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    boardName: {
      type: "string",
      required: true,
    },

    todos: {
      collection: "todo",
      via: "board",
    },
  },
  beforeDestroy: function (criteria, cb) {
    Board.find(criteria)
      .populate("todos")
      .exec(function (err, boards) {
        if (err) return cb(err);
        boards.forEach(function (recordToDestroy) {
          Todo.destroy({ id: _.pluck(recordToDestroy.todos, "id") }).exec(
            function (err) {
              if (err) {
                console.log(err);
              }
            }
          );
        });
        cb();
      });
  },
};
