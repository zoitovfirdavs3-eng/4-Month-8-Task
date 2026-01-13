const { Router } = require("express");
const todoController = require("../controller/todo.controller");
const todoValidator = require("../utils/todo.validator");

const todoRouter = Router();

todoRouter.get("/all", todoController.GET_TODOS);

todoRouter.route("/:id")
.get(todoController.GET_TODOS)
.delete(todoController.DELETE_TODO)
.put(todoController.UPDATE_TODO);

todoRouter.post("/create",todoValidator , todoController.CREATE_TODO);

module.exports = todoRouter;