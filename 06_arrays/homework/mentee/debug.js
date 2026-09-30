// ============================================================
// 🐛  ARRAYS — HOMEWORK  |  DEBUG TASKS
// ============================================================
// Fix the bug in each snippet.
// Explain what was wrong as a comment. Then fix it.
// ============================================================

// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This should log the middle element ("C") of the array.
// Instead it logs undefined. What's wrong?

const letters = ["A", "B", "C", "D", "E"];
// const middleIndex = letters.length / 2;
// console.log(letters[middleIndex]);

// What's wrong ↓
// .length would return 5, while E is at index [4] since array starts at 0. 5 doesnt exist.
// Your fix ↓
const middleIndex = (letters.length - 1) / 2; // - 1 to account for index [0]
console.log(letters[middleIndex]);

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This loop should build a total of all prices.
// It logs NaN instead of a number. What's wrong?

const prices = [10, 20, 30, 40];
let total = 0;

// for (let i = 0; i <= prices.length; i++) {
//   total += prices[i];
// }

// console.log("Total: $" + total);

// What's wrong ↓
// prices.length would be 4. <= means that the array would go to index[4] which doesnt exist.
// Your fix ↓
// changing <= to < would stop before index[4].
for (let i = 0; i < prices.length; i++) {
  total += prices[i];
}

console.log("Total: $" + total);

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This code is supposed to find the highest score in the array
// and log the winner's name. It always logs the wrong winner.
// There are TWO bugs. Find both.

const names = ["Alice", "Bob", "Carol", "Dave"];
const scores = [82, 91, 78, 95];

// let topIndex = 1;
// let topScore = 0;

// for (let i = 0; i < scores.length; i++) {
//   if (scores[i] > topScore) {
//     topScore = scores[i];
//     topIndex = i;
//   }
// }

// console.log("Winner: " + names[topIndex] + " with " + topScore);

// Bug 1 ↓
// let topIndex should be set to 0. if all scores were set to zero, it would show that bob is the winner when alice should win.

// Bug 2 ↓
// let topScore should be set to scores[0] since if it is set to 0, all negative scores would shown as 0.
// changing topScore = scores[0] lets us start from index[0] and then checks if the next numbers in index are higher.
// Your fix ↓
let topIndex = 0; // changed to 0 from 1
let topScore = scores[0];

for (let i = 0; i < scores.length; i++) {
  if (scores[i] > topScore) {
    topScore = scores[i];
    topIndex = i;
  }
}

console.log("Winner: " + names[topIndex] + " with " + topScore);
