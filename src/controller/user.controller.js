const { globalError, ClientError } = require("shokhijakhon-error-handler");
const readDb = require("../utils/readFile");
const writeDb = require("../utils/writeFile");

module.exports = {
  async GET_USERS(req, res) {
    try {
      let users = await readDb("users");
      let { id } = req.params;
      if (id) {
        let findUser = users.find(user => user.id == id);
        if (!findUser) throw new ClientError(`User not found`, 404);
        return res.json(findUser);
      }
      return res.json(users);
    } catch (err) {
      return globalError(err, res);
    }
  },
  async DELETE_USER(req, res) {
    try {
      let users = await readDb("users");
      let { id } = req.params;
      let findUser = users.find(user => user.id == id);
      if (!findUser) throw new ClientError(`User not found`, 404);
      let filterUser = users.filter(user => user.id != id);
      await writeDb("users", filterUser);
      return res.json({ message: "User successfully deleted !", status: 200 });
    } catch (err) {
      return globalError(err, res);
    }
  },
  async CREATE_USER(req, res) {
    try {
      let newUser = req.body;

      let users = await readDb("users");

      let checkUser = users.some(user => user.email == newUser.email);

      if (checkUser) throw new ClientError(`User already exists`, 400);

      newUser = {
        id: users.length ? users.at(-1).id + 1 : 1,
        ...newUser,
        createdAt: new Date().toLocaleString(),
      };

      users.push(newUser);

      await writeDb("users", users);

      return res
        .status(201)
        .json({ message: "User successfully created !", status: 201 });
    } catch (err) {
      return globalError(err, res);
    }
  },
  async UPDATE_USER(req, res) {
    try {
      let users = await readDb("users");
      let { id } = req.params;
      let findUser = users.find(user => user.id == id);
      if (!findUser) throw new ClientError(`User not found`, 404);
      let idx = users.findIndex(user => user.id == id);
      users[idx] = {...users[idx], ...req.body};
      await writeDb("users", users);
      return res.json({ message: "User successfully updated", status: 200 });
    } catch (err) {
      return globalError(err, res);
    }
  },
};
