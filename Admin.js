const User = require("./User");

class Admin extends User {
    constructor(userId, name, email) {
        super(userId, name, email);
    }

    addProduct(product, products) {
        products.push(product);
    }

    removeProduct(productId, products) {
        return products.filter(product => product.productId !== productId);
    }

    updateProduct(product, name, price, stock) {
        product.name = name;
        product.price = price;
        product.stock = stock;
    }
}

module.exports = Admin;