const { globalError, ClientError } = require("shokhijakhon-error-handler");

module.exports = (req, res, next) => {
  const emailRegax =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  try {
    let user = req.body;
    if (!user.firstname) throw new ClientError(`Firstname is required`, 400);
    if (!user.lastname) throw new ClientError(`Lastname is required`, 400);
    if (!user.email) throw new ClientError(`Email is required`, 400);
    if(!emailRegax.test(user.email)) throw new ClientError(`Email is not valid`, 400);
    if (!user.password) throw new ClientError(`Password is required`, 400);
    if(user.password.length < 3 || user.password.length > 15) throw new ClientError(`Password is not valid`, 400)
    return next();
  } catch (err) {
    return globalError(err, res);
  }
};
