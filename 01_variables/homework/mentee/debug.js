// ============================================================
// 🐛  VARIABLES — HOMEWORK  |  DEBUG TASKS
// ============================================================
// Fix the bug in each snippet.
// Explain what was wrong as a comment before your fix.
// Run the file to confirm each fix works.
// ============================================================


// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This throws an error. What's wrong and how do you fix it?

// const storeName = "TechMart";
// storeName = "MegaShop";
// console.log(storeName);

// What's wrong ↓
// variable is declared as a const instead of let.
// Your fix ↓
let storeName = "TechMart";
storeName = "MegaShop";
console.log(storeName);

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This runs but the output is wrong. Find the bug.

// let item1Price = 19.99;
// let item2Price = 34.99;
// let orderTotal = item1Price + Item2Price;
// console.log("Total: $" + orderTotal);

// What's wrong ↓
// variable is item2Price, not Item2Price... ie. Case sensitive

// Your fix ↓
let item1Price = 19.99;
let item2Price = 34.99;
let orderTotal = item1Price + item2Price;
console.log("Total: $" + orderTotal);

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This code runs without throwing an error,
// but something is still wrong with it.
// Find the issue and explain why it's a problem.

// var productName = "Headphones";
// var productPrice = 49.99;
// console.log(productName + " — $" + productPrice);

// Hint: the code works, but what keyword should you be using instead?
// Why is the current keyword considered bad practice?
// What's wrong ↓
// var is considered outdated, and should use const/let instead

// Your fix ↓
const productName = "Headphones";
const productPrice = 49.99;
console.log(productName + " — $" + productPrice);