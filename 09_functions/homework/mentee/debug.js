// ============================================================
// 🐛  FUNCTIONS — HOMEWORK  |  DEBUG TASKS
// ============================================================

// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This arrow function should return the full name
// but always returns undefined. What's wrong?

// const getFullName = (first, last) => {
//   first + " " + last;
// };

// console.log(getFullName("Alex", "Rivera"));

// What's wrong ↓
// did not declare as a function.

// Your fix — write TWO versions:
//   a) Fix by adding return inside the braces
// const getFullName = function (first, last) {
//   return first + " " + last;
// };

//   b) Fix by removing the braces (one-liner implicit return)
const getFullName = (first, last) => first + " " + last;

console.log(getFullName("Alex", "Rivera"));

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This should return "Admin", "Moderator", or "Member"
// depending on role. It works for "admin" but returns
// undefined for everything else. What's wrong?

// function getRoleLabel(role) {
//   if (role === "admin") {
//     return "Admin";
//   } else if (role === "mod") {
//     return "Moderator";
//   } else {
//     return "Member";
//   }
// }

// console.log(getRoleLabel("admin")); // "Admin" ✅
// console.log(getRoleLabel("mod")); // undefined ❌
// console.log(getRoleLabel("member")); // undefined ❌

// What's wrong ↓
// no return value for moderator/member

// Your fix ↓
// Bonus: rewrite the whole function as an arrow function
// using nested ternaries (just to see what it looks like —
// then write a comment about whether you'd actually use it).

const getRoleLabel = (role) =>
  role === "admin" ? "Admin" : role === "mod" ? "Moderator" : "Member";

console.log(getRoleLabel("admin")); // "Admin" ✅
console.log(getRoleLabel("mod")); // undefined ❌
console.log(getRoleLabel("member")); // undefined ❌

//would not use nested ternaries, since it gets messy to read compared to just using if/else

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This discount calculator has TWO bugs.
// One causes the wrong math. One is a style issue from Lesson 8.

// const applyDiscount = (price, discountPercent = 10) => {
//   const discountAmount = price * discountPercent;
//   const finalPrice = price + discountAmount;
//   return finalPrice;
// };

// console.log(applyDiscount(100, 20)); // expected: 80
// console.log(applyDiscount(50)); // expected: 45

// Your fix ↓

// Bug 1 (math) ↓
// const applyDiscount = (price, discountPercent = 10) => {
//   const discountAmount = (price * discountPercent) / 100;
//   const finalPrice = price - discountAmount;
//   return finalPrice;
// };

// Bug 2 (style) ↓
const applyDiscount = (price, discountPercent = 10) =>
  price - (price * discountPercent) / 100;

console.log(applyDiscount(100, 20)); // expected: 80
console.log(applyDiscount(50)); // expected: 45
