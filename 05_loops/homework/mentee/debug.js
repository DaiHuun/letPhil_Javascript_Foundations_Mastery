// ============================================================
// 🐛  LOOPS — HOMEWORK  |  DEBUG TASKS
// ============================================================
// Fix the bug in each snippet.
// Explain what was wrong as a comment. Then fix it.
// ============================================================

// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This loop should log numbers 1 through 10.
// It only logs 1 through 9. What's wrong?

// for (let i = 1; i < 10; i++) {
//   console.log(i);
// }

// What's wrong ↓
// i < 10 meaning as long as it is lower than 10, ie 9.
// Your fix ↓
// change to <= to include 10

for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This loop should calculate the sum of 1 through 5 (answer: 15).
// It always logs 0. What's wrong?

// for (let i = 1; i <= 5; i++) {
//   let total = 0;
//   total += i;
// }
// console.log("Sum: " + total);

// What's wrong ↓
// let total inside the for loop would keep setting it to 0 instead of adding i to total.
// declaring total outside wont reset during the for loop.

// Your fix ↓
let total = 0;
for (let i = 1; i <= 5; i++) {
  total += i;
}
console.log("Sum: " + total);
// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This loop should log all ODD numbers from 1 to 10,
// then log "Done!" at the end.
// Instead it logs nothing and skips straight to "Done!".
// There are TWO bugs. Find both.

// for (let i = 1; i <= 10; i++) {
//   if (i % 2 === 0) {
//     console.log(i);
//   } else {
//     continue;
//   }
// }
// console.log("Done!");

// Bug 1 ↓
// no i++ in the if loop to increment i. 1 % 2 === 0 doesnt work, so it would continue infinitely since no increment to 2.
// logs done because its outside the loop.

// Bug 2 ↓
// i % 2 === 0 would mean even numbers instead since it is divisible by 2 with no remainder.
// need to change to i % 2 !== 0 meaning it would log numbers not divisible by 2 ie, odd numbers.

// Your fix ↓
for (let i = 1; i <= 10; i++) {
  // looking for odd numbers
  if (i % 2 !== 0) {
    console.log(i);
    i++; //to increment
  } else {
    continue;
  }
}
console.log("Done!");
