const { globalError, ClientError } = require("shokhijakhon-error-handler");

module.exports = (req, res, next) => {
  try {
    let todo = req.body;
    if(!todo.title) throw new ClientError(`Todo title is required !`, 400);
    if(!todo.description) throw new ClientError(`Todo description is required !`, 400);



    return next();
  } catch (err) {
    return globalError(err, res);
  }
};
