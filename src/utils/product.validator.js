const { globalError, ClientError } = require("shokhijakhon-error-handler")

module.exports = (req, res, next) => {
    try {
        let product = req.body;
        if(!product.name) throw new ClientError(`Product name is required`, 400);
        if(!product.price) throw new ClientError(`Product price is required`, 400);
        if(!product.count) throw new ClientError(`Product count is required`, 400);
        return next();
    } catch (err) {
        return globalError(err, res);
    }
}