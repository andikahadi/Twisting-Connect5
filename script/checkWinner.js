"use strict";


// const arrWinX = [
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 2],
//   [0, 0, 0, 0, 2, 0],
//   [0, 0, 0, 2, 0, 0],
//   [0, 0, 2, 0, 0, 0],
//   [0, 2, 0, 0, 0, 0]
// ];

// const arrWinX = [
//   [0, 1, 1, 1, 1, 0],
//   [1, 1, 1, 1, 0, 0],
//   [1, 1, 1, 1, 0, 1],
//   [1, 1, 0, 0, 1, 0],
//   [1, 0, 0, 1, 0, 0],
//   [0, 0, 1, 0, 0, 0]
// ];

const arrWinX = [
  [1, 1, 0, 0, 0, 0],
  [0, 2, 1, 0, 0, 0],
  [1, 0, 2, 1, 0, 0],
  [0, 1, 0, 2, 1, 0],
  [1, 0, 1, 0, 2, 1],
  [0, 1, 0, 2, 0, 2]
];


/////////////////
// Check Winner : iterating through the whole table
////////////////


function checkWinner(arr) {
  //check per row if there's 5 in a row
  function isFive(count) {
    if (count === 5) {
      return true
    }
  }


  for (let i = 0; i < arr.length; i++) {
    let consecutiveCount = 0;
    for (let j = 0; j < arr[0].length; j++) {
      if (arr[i][j] === 0) { // check if the element is 0; if yes -> no change to count
        consecutiveCount += 0;
      } else if (consecutiveCount === 0 || arr[i][j] !== arr[i][j - 1]) { //if start of a new consecutive, or stone is different than previous
        consecutiveCount = 1;

      } else { // if stone is same as previous
        consecutiveCount += 1;
        if (isFive(consecutiveCount)) {
          return `We have a winner : ${arr[i][j]}`
        }
      }
    }
  }
  console.log("No winner from row");
  //check per column if there's 5 in a row

  for (let j = 0; j < arr[0].length; j++) {
    let consecutiveCount = 0
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][j] === 0) {
        consecutiveCount += 0; // check if the element is 0; if yes -> no change to count
      } else if (consecutiveCount === 0 || arr[i][j] !== arr[i - 1][j]) { //if start of a new consecutive, or stone is different than previous
        consecutiveCount = 1;

      } else { // if stone is same as previous
        consecutiveCount += 1;
        if (isFive(consecutiveCount)) {
          return `We have a winner : ${arr[i][j]}`
        }
      }
    }
  }
  console.log("no winner from column");

  // check diagonal left bottom to top right  --> rectify done
  for (let k = 0; k < arr.length; k++) {
    let i = k;
    let j = 0;
    let consecutiveCount = 0;
    while (i >= 0) {
      if (arr[i][j] === 0) {
        consecutiveCount += 0
      } else if (consecutiveCount === 0 || arr[i][j] !== arr[i + 1][j - 1]) { //if start of a new consecutive, or stone is different as previous
        consecutiveCount = 1;
      } else {
        consecutiveCount += 1;
        if (isFive(consecutiveCount)) {
          return `We have a winner : ${arr[i][j]}`
        }
      }
      console.log(`${consecutiveCount} i: ${i}  j: ${j}`);
      i -= 1;
      j += 1;
    }
  }

  for (let k = 1; k < arr[0].length; k++) {
    let i = arr.length - 1;
    let j = k;
    let consecutiveCount = 0;
    while (j < arr[0].length) {
      if (arr[i][j] === 0) {
        consecutiveCount += 0;
      } else if (consecutiveCount === 0 || arr[i][j] !== arr[i + 1][j - 1]) { //if start of a new consecutive, or stone is different as previous
        consecutiveCount = 1;
      } else {
        consecutiveCount += 1;
        if (isFive(consecutiveCount)) {
          return `We have a winner : ${arr[i][j]}`
        }
      }
      console.log(`${consecutiveCount} i: ${i}  j: ${j}`);

      i -= 1;
      j += 1;
    }
  }
  console.log("no winner from diagonal1");


  // check diagonal top left to bottom right
  for (let k = arr.length - 1; k >= 0; k--) {
    let i = k;
    let j = 0;
    let consecutiveCount = 0;
    while (i <= arr.length - 1) {
      if (arr[i][j] === 0) {
        consecutiveCount += 0
      } else if (consecutiveCount === 0 || arr[i][j] !== arr[i - 1][j - 1]) { //if start of a new consecutive, or stone is same as previous
        consecutiveCount = 1;
      } else {
        consecutiveCount += 1;

        if (isFive(consecutiveCount)) {
          return `We have a winner : ${arr[i][j]}`
        }
      }
      console.log(`${consecutiveCount} i: ${i}  j: ${j}`);
      i += 1;
      j += 1;
    }
  }

  for (let k = 1; k <= arr[0].length - 1; k++) {
    let i = 0;
    let j = k;
    let consecutiveCount = 0;
    while (j <= arr[0].length - 1) {
      if (arr[i][j] === 0) {
        consecutiveCount += 0;
      } else if (consecutiveCount === 0 || arr[i][j] !== arr[i - 1][j - 1]) { //if start of a new consecutive, or stone is same as previous
        consecutiveCount = 1;

      } else {
        consecutiveCount += 1;

        if (isFive(consecutiveCount)) {
          return `We have a winner : ${arr[i][j]}`
        }
      }
      console.log(`${consecutiveCount} i: ${i}  j: ${j}`);
      i += 1;
      j += 1;
    }
  }
};

console.log(checkWinner(arrWinX));

// function. diagonal1() {
//   //traverse diagonal
//   const m = arrWinX.length;
//   const n = arrWinX[0].length;
//   for (let k = 0; k <= m - 1; k++) {
//     let i = k;
//     let j = 0;
//     while (i >= 0) {
//       console.log(arrWinX[i][j])
//       i -= 1;
//       j += 1;
//     }
//   }

//   for (let k = 1; k <= n - 1; k++) {
//     let i = n - 1;
//     let j = k;
//     while (j <= n - 1) {
//       console.log(arrWinX[i][j])
//       i -= 1;
//       j += 1;
//     }
//   }
// };

// function diagonal2() {
//   const m = arrWinX.length;
//   const n = arrWinX[0].length;
//   for (let k = m - 1; k >= 0; k--) {
//     let i = k;
//     let j = 0;
//     while (i <= m - 1) {
//       console.log(arrWinX[i][j])
//       i += 1;
//       j += 1;
//     }
//   }

//   for (let k = 1; k <= n - 1; k++) {
//     let i = 0;
//     let j = k;
//     while (j <= n - 1) {
//       console.log(arrWinX[i][j])
//       i += 1;
//       j += 1;
//     }
//   }
// };


// diagonal1();

// diagonal2();