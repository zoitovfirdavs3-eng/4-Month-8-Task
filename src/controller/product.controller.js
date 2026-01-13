const { globalError, ClientError } = require("shokhijakhon-error-handler");
const readDb = require("../utils/readFile");
const writeDb = require("../utils/writeFile");

module.exports = {
  async GET_PRODUCTS(req, res) {
    try {
      let products = await readDb("products");
      let { id } = req.params;
      if (id) {
        let findProduct = products.find(product => product.id == id);
        if (!findProduct) throw new ClientError(`Product not found`, 404);
        return res.json(findProduct);
      }
      return res.json(products);
    } catch (err) {
      return globalError(err, res);
    }
  },
  async DELETE_PRODUCTS(req, res) {
    try {
      let products = await readDb("products");
      let { id } = req.params;
      let findProduct = products.find(product => product.id == id);
      if (!findProduct) throw new ClientError(`Product not found`, 404);
      products = products.filter(product => product.id != id);
      await writeDb("products", products);
      return res.json({ message: "User successfully deleted", status: 200 });
    } catch (err) {
      return globalError(err, res);
    }
  },
  async CREATE_PRODUCTS(req, res) {
    try {
      let products = await readDb("products");
      let newProduct = req.body;
      let checkProduct = products.find(product => product.name == newProduct.name && product.price == newProduct.price);

      if(checkProduct) {
        checkProduct.count += newProduct.count;
        checkProduct.total_price += newProduct.price * newProduct.count;
        await writeDb("products", products);
        return res.status(201).json({message: "Product already exists, count updated !", status: 201});
      };
      newProduct = {
        id: products.length ? products.at(-1).id + 1 : 1,
        ...newProduct, total_price: newProduct.count * newProduct.price,
        createdAt: new Date().toLocaleString(),
      };
      products.push(newProduct);
      await writeDb("products", products);
      return res.status(201).json({
        message: "Product successfully created !",
        status: 201,
        id: newProduct.id,
      });
    } catch (err) {
      return globalError(err, res);
    }
  },
  async UPDATE_PRODUCTS(req, res) {
    try {
      let products = await readDb("products");
      let { id } = req.params;
      let idx = products.findIndex(product => product.id == id);
      products[idx] = { ...products[idx], ...req.body };
      await writeDb("products", products);
      res.json({ message: "Product successfully updated", status: 200 });
    } catch (err) {
      return globalError(err, res);
    }
  },
};
