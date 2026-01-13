const { Router } = require("express");
const userController = require("../controller/user.controller");
const userValidator = require("../utils/user.validator");

const userRouter = Router();

userRouter.get("/all", userController.GET_USERS);

userRouter
  .route("/:id")
  .put(userController.UPDATE_USER)
  .get(userController.GET_USERS)
  .delete(userController.DELETE_USER);

userRouter.post("/create", userValidator, userController.CREATE_USER);

module.exports = userRouter;
