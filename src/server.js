require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const userRouter = require("./router/user.routes");
const productRouter = require("./router/product.routes");
const todoRouter = require("./router/todo.routes");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/todos", todoRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}-port`));
