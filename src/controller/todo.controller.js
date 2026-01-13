const { globalError } = require("shokhijakhon-error-handler");
const readDb = require("../utils/readFile");
const writeDb = require("../utils/writeFile");

module.exports = {
  async GET_TODOS(req, res) {
    try {
      let todos = await readDb("todos");
      let { id } = req.params;
      if (id) {
        let findTodo = todos.find(todo => todo.id == id);
        if (!findTodo) throw new ClientError(`Todo not found`, 404);
        return res.json(findTodo);
      }

      return res.json(todos);
    } catch (err) {}
  },
  async DELETE_TODO(req, res) {
    try {
      let todos = await readDb("todos");
      let {id} = req.params;
      todos = todos.filter(todo => todo.id != id);
      await writeDb("todos", todos);
      return res.json({message: "User successfully deleted !", status: 200});
    } catch (err) {
      return globalError(err, res);
    }
  },
  async CREATE_TODO(req, res) {
    try {
      let todos = await readDb("todos");
      let newTodo = req.body;
      newTodo = {id: todos.length ? todos.at(-1).id + 1 : 1, ...newTodo, createdAt: new Date().toLocaleString()};
      todos.push(newTodo);
      await writeDb("todos", todos);
      return res.status(201).json({message: "User successfully created !", status: 201, id: newTodo.id});
    } catch (err) {
      return globalError(err, res);
    }
  },
  async UPDATE_TODO(req, res) {
    try {
      let todos = await readDb("todos");
      let {id} = req.params;
      let findTodo = todos.find(todo => todo.id == id);
      if (!findTodo) throw new ClientError(`Todo not found`, 404);
      let idx = todos.findIndex(todo => todo.id == id);
      todos[idx] = {...todos[idx], ...req.body};
      await writeDb("todos", todos);
      return res.json({message: "Todo successfully updated !", status: 200});
    } catch (err) {
      return globalError(err, res);
    }
  },
};
