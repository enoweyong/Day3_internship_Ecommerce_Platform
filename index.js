/*const Product = require("./Product");
const Customer = require("./Customer");
const Payment = require("./Payment");
const Checkout = require("./Checkout");
const ECommerceSystem = require("./EcommerceSystem");

const system = new ECommerceSystem();

const laptop = new Product(
    1,
    "Laptop",
    "Dell Core i7",
    800,
    10,
    "Electronics"
);

const phone = new Product(
    2,
    "Smartphone",
    "Samsung Galaxy",
    500,
    20,
    "Electronics"
);

system.catalog.addProduct(laptop);
system.catalog.addProduct(phone);

const customer = new Customer(
    101,
    "Besong John",
    "john@gmail.com",
    "Buea, Cameroon"
);

system.registerCustomer(customer);

customer.shoppingCart.addProduct(laptop, 1);
customer.shoppingCart.addProduct(phone, 2);

customer.shoppingCart.displayCart();

const order = Checkout.checkout(customer);

system.addOrder(order);

order.displayOrder();

const payment = new Payment(
    1,
    order,
    "Mobile Money"
);

payment.processPayment();
*/

const readline = require("readline");
const Product = require("./Product");
const Customer = require("./Customer");
const Checkout = require("./Checkout");
const Payment = require("./Payment");
const ECommerceSystem = require("./EcommerceSystem");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const system = new ECommerceSystem();

const products = [
    new Product(1, "Laptop", "Dell Core i7", 800, 10, "Electronics"),
    new Product(2, "Smartphone", "Samsung Galaxy S24", 700, 20, "Electronics"),
    new Product(3, "Tablet", "Apple iPad Air", 650, 15, "Electronics"),
    new Product(4, "Smart Watch", "Apple Watch Series 10", 500, 12, "Electronics"),
    new Product(5, "Headphones", "Sony WH-1000XM5", 250, 30, "Electronics"),
    new Product(6, "Bluetooth Speaker", "JBL Charge 5", 180, 18, "Electronics"),
    new Product(7, "Gaming Mouse", "Logitech G502", 80, 25, "Accessories"),
    new Product(8, "Mechanical Keyboard", "Redragon K552", 90, 20, "Accessories"),
    new Product(9, "Monitor", "24-inch HP Full HD", 220, 10, "Electronics"),
    new Product(10, "Printer", "HP LaserJet", 350, 8, "Office"),

    new Product(11, "Backpack", "Laptop Backpack", 45, 40, "Fashion"),
    new Product(12, "Running Shoes", "Nike Air Zoom", 120, 25, "Fashion"),
    new Product(13, "T-Shirt", "Polo T-Shirt", 25, 60, "Fashion"),
    new Product(14, "Jeans", "Blue Denim", 50, 35, "Fashion"),
    new Product(15, "Jacket", "Leather Jacket", 150, 10, "Fashion"),

    new Product(16, "Coffee Maker", "Philips Coffee Machine", 130, 15, "Home"),
    new Product(17, "Microwave", "LG Microwave Oven", 200, 10, "Home"),
    new Product(18, "Electric Kettle", "Silver Crest Kettle", 40, 30, "Home"),
    new Product(19, "Vacuum Cleaner", "Panasonic Vacuum", 180, 12, "Home"),
    new Product(20, "Air Fryer", "Ninja Air Fryer", 170, 15, "Home")
];

products.forEach(product => system.catalog.addProduct(product));

const customer = new Customer(101, "Besong John", "john@gmail.com", "Buea");
   
    function menu() {
    console.log("\n========== E-COMMERCE SYSTEM ==========");
    console.log("1. View Products");
    console.log("2. Add Product to Cart");
    console.log("3. View Shopping Cart");
    console.log("4. Checkout");
    console.log("5. Exit");

    rl.question("\nEnter your choice: ", handleMenu);
}

function handleMenu(choice) {

    switch (choice) {

        case "1":

            console.log("\n========== PRODUCT CATALOG ==========");

            system.catalog.products.forEach(product => {

                console.log(
                    `${product.productId}. ${product.name} | ${product.category} | $${product.price} | Stock: ${product.stock}`
                );

            });

            menu();
            break;

        case "2":

            addProductToCart();
            break;

        case "3":

            customer.shoppingCart.displayCart();
            menu();
            break;

        case "4":

            checkout();
            break;

        case "5":

            console.log("\nThank you for shopping with us.");
            rl.close();
            break;

        default:

            console.log("Invalid Choice.");
            menu();
    }

}
function addProductToCart() {

    console.log("\n========== AVAILABLE PRODUCTS ==========");

    system.catalog.products.forEach(product => {

        console.log(`
            ${product.productId}. ${product.name} - $${product.price} (Stock:${product.stock})
        `);

    });

    

    rl.question("\nEnter Product ID: ", (id) => {

        const product = system.catalog.products.find(
            p => p.productId === Number(id)
        );

        if (!product) {

            console.log("Product not found.");

            return menu();

        }

        rl.question("Enter Quantity: ", (qty) => {

            qty = Number(qty);

            if (qty <= 0) {

                console.log("Invalid Quantity.");

                return menu();

            }

            if (qty > product.stock) {

                console.log("Insufficient Stock.");

                return menu();

            }

            customer.shoppingCart.addProduct(product, qty);

            console.log(`${qty} ${product.name}(s) added successfully.`);

            menu();

        });

    });

}

function checkout() {

    if (customer.shoppingCart.items.length === 0) {

        console.log("\nYour cart is empty.");

        return menu();

    }

    const order = Checkout.checkout(customer);

    order.displayOrder();

    rl.question("\nEnter Customer Name: ", (name) => {

        rl.question("Enter Payment Amount: $", (amount) => {

            amount = Number(amount);

            if (amount === order.calculateTotal()) {

                const payment = new Payment(
                    Date.now(),
                    order,
                    "Mobile Money"
                );

                payment.processPayment();

                console.log("\n========== RECEIPT ==========");

                console.log("Customer :", name);

                console.log("Order ID :", order.orderId);

                console.log("Amount   : $" + amount);

                console.log("Status   : SUCCESS");

                console.log("=============================");

            } else {

                console.log("\nPayment Failed!");

                console.log("Expected : $" + order.calculateTotal());

                console.log("Received : $" + amount);

            }

            menu();

        });

    });

}
menu();