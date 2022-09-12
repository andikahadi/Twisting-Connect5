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
      if ((consecutiveCount === 0 || arr[i][j] === arr[i][j - 1]) && arr[i][j] !== 0) { //if start of a new consecutive, or stone is same as previous
        consecutiveCount += 1;
        console.log(consecutiveCount);
        if (isFive(consecutiveCount)) {
          return `We have a winner : ${arr[i][j]}`
        }
      } else { // if stone is different 
        consecutiveCount = 0;
      }
    }
  }
  console.log("No winner from row");
  //check per column if there's 5 in a row

  for (let j = 0; j < arr[0].length; j++) {
    let consecutiveCount = 0
    for (let i = 0; i < arr.length; i++) {
      if ((consecutiveCount === 0 || arr[i][j] === arr[i - 1][j]) && arr[i][j] !== 0) { //if start of a new consecutive, or stone is same as previous
        consecutiveCount += 1;
        console.log(consecutiveCount);
        if (isFive(consecutiveCount)) {
          return `We have a winner : ${arr[i][j]}`
        }
      } else { // if stone is different 
        consecutiveCount = 0;
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


function diagonal1() {
  //traverse diagonal
  const m = arrWinX.length;
  const n = arrWinX[0].length;
  for (let k = 0; k <= m - 1; k++) {
    let i = k;
    let j = 0;
    while (i >= 0) {
      console.log(arrWinX[i][j])
      i -= 1;
      j += 1;
    }
  }

  for (let k = 1; k <= n - 1; k++) {
    let i = n - 1;
    let j = k;
    while (j <= n - 1) {
      console.log(arrWinX[i][j])
      i -= 1;
      j += 1;
    }
  }
};

function diagonal2() {
  const m = arrWinX.length;
  const n = arrWinX[0].length;
  for (let k = m - 1; k >= 0; k--) {
    let i = k;
    let j = 0;
    while (i <= m - 1) {
      console.log(arrWinX[i][j])
      i += 1;
      j += 1;
    }
  }

  for (let k = 1; k <= n - 1; k++) {
    let i = 0;
    let j = k;
    while (j <= n - 1) {
      console.log(arrWinX[i][j])
      i += 1;
      j += 1;
    }
  }
};


// diagonal1();

// diagonal2();

const smallArr1 = [
  [1, 2, 3],
  [7, 8, 9],
  [13, 14, 15]
];

const smallArr2 = [
  [4, 5, 6],
  [10, 11, 12],
  [16, 17, 18]
];

const smallArr3 = [
  [19, 20, 21],
  [25, 26, 27],
  [31, 32, 33]
];

const smallArr4 = [
  [22, 23, 24],
  [28, 29, 30],
  [34, 35, 36]
];


function clockwiseRotate(smallArr) {
  const arr = smallArr;
  let n = arr.length;

  for (let i = 0; i < 3; i++) {
    for (let j = i; j < 3; j++) {
      let temp = arr[i][j];
      arr[i][j] = arr[j][i];
      arr[j][i] = temp;
      // console.log(`${i},${j} : ${arr[i][j]} , temp: ${temp} ; arr j i : ${arr[j][i]}`);
    }
  }
  console.log(arr);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n / 2; j++) {
      let temp = arr[i][j];
      arr[i][j] = arr[i][n - 1 - j];
      arr[i][n - 1 - j] = temp;
    }
  }
  console.log(arr);
}

// clockwiseRotate(smallArr);

function combineArrayHorizontal(arr1, arr2) {
  let newArr = [];
  for (let i = 0; i < arr1.length; i++) {
    let temp = [];
    for (let j = 0; j < arr1[0].length; j++) {
      temp.push(arr1[i][j]);
      // console.log(temp);
    }
    for (let j = 0; j < arr2[0].length; j++) {
      temp.push(arr2[i][j]);
      // console.log(temp);
    }
    newArr.push(temp);

  }
  return newArr;
}

function combineArrayVertical(arr1, arr2) {
  let newArr = [];
  for (let i = 0; i < arr1.length; i++) {
    let temp = [];
    for (let j = 0; j < arr1[0].length; j++) {
      temp.push(arr1[i][j]);
      // console.log(temp);
    }
    newArr.push(temp);
  }


  for (let i = 0; i < arr2.length; i++) {
    let temp = [];
    for (let j = 0; j < arr2[0].length; j++) {
      temp.push(arr2[i][j]);
      // console.log(temp);
    }
    newArr.push(temp);
  }
  return newArr;
}

// console.log(combineArrayVertical(combineArrayHorizontal(smallArr1, smallArr2), combineArrayHorizontal(smallArr3, smallArr4)));