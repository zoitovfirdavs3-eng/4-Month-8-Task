const { globalError, ClientError } = require("shokhijakhon-error-handler")

module.exports = (req, res, next) => {
    try {
        let product = req.body;
        if(!product.name) throw new ClientError(`Product name is required`, 400);
        if(!product.price) throw new ClientError(`Product price is required`, 400);
        if(product.price.isNaN()) throw new ClientError(`Product price is NaN`, 400);
        if(product.price == 0) throw new ClientError(`Product price is not valid`, 400);
        if(!product.count) throw new ClientError(`Product count is required`, 400);
        if(product.count == 0) throw new ClientError(`Product count is not valid`, 400);
        return next();
    } catch (err) {
        return globalError(err, res);
    }
}