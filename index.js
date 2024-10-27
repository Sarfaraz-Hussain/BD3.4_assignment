const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

let cors = require('cors');

app.use(cors());

// Endpoint 1: Add an Item to the Cart
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];
function addProduct(cart, product) {
  cart.push(product);
  return cart;
}
app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let product = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };
  let ans = addProduct(cart.slice(), product);
  res.json({ cartItems: ans });
});

// Endpoint 2: Edit Quantity of an Item in the Cart
function updateQuantityById(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
    }
  }
  return cart;
}
app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let ans = updateQuantityById(cart.slice(), productId, quantity);
  res.json({ cartItems: ans });
});

// Endpoint 3: Delete an Item from the Cart
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let ans = cart.filter((product) => product.productId != productId);
  res.json({ cartItems: ans });
});

// Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

// Endpoint 5: Calculate Total Quantity of Items in the Cart
function calculateTotalQuantity(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].quantity;
  }
  return total;
}
app.get('/cart/total-quantity', (req, res) => {
  let ans = calculateTotalQuantity(cart);
  res.json({ totalQuantity: ans });
});

// Endpoint 6: Calculate Total Price of Items in the Cart
function calculateTotalPrice(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return total;
}
app.get('/cart/total-price', (req, res) => {
  let ans = calculateTotalPrice(cart);
  res.json({ totalPrice: ans });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
