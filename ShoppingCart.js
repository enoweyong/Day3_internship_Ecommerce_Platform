const CartItem = require("./CartItem");

class ShoppingCart{
    constructor(){
        this.items = [];
    }
    addProduct(product, quantity){
        this.items.push(new CartItem(product, quantity))
    }
    removeProduct(productId){
        this.items = this.items.filter(
            item => item.product.productId !==productId
        );
    }
    getTotal(){
        return this.items.reduce(
        (total, item ) => total + item.getSubtotal(), 0)
    }
    clearCart(){
        this.items = [];
    }
    displayCart(){
        console.log(
            "==== shoping Cart ===="
        )
        this.items.forEach(item =>{
            console.log(`${item.product.name} x ${item.quantity} == $${item.getSubtotal()}`)
        });
        console.log(`Total: $${this.getTotal()}`)
    }
}
module.exports = ShoppingCart;