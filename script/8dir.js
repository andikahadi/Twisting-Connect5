"use strict";
//check 8 direction of a point, and count if there is 5 consecutive
//this 8dir function is not used as iterating through row,column, diagonal is faster

// const arrWinX = [
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0],
//   [1, 1, 1, 1, 1, 0],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0]
// ];

// const arrWinX = [
//   [0, 0, 0, 0, 0, 0],
//   [0, 1, 1, 1, 1, 1],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0]
// ];

// [0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0],

//   [0, 1, 1, 1, 1, 1],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0]

const arrWinX = [
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0]
];


function checkWinner(xStart, yStart, arrWinX) {
  const xDir = [0, 1, 1, 1, 0, -1, -1, -1]; // pair of x[i]y[i] represent direction of checking
  const yDir = [1, 1, 0, -1, -1, -1, 0, 1]; // south, southeast,east,....,southwest

  // let xStart = 1; //this will be an x,y input of stone placed
  // let yStart = 1;
  function isWithinLimit(x, y, arr) {
    if ((x >= 0 && x < arr[0].length) && (y >= 0 && y < arr.length)) {
      return true;
    } else {
      return false;
    }
  };

  for (let i = 0; i < 8; i++) {
    let numCount = 0;
    let xTracker = xStart;
    let yTracker = yStart;
    let stop = false;


    for (let j = 0; j < 5 && isWithinLimit(xTracker, yTracker, arrWinX); j++) {
      console.log(xTracker);
      console.log(yTracker);
      if ((arrWinX[yTracker][xTracker]) === 1) {
        numCount += 1;
      }
      xTracker += xDir[i];
      yTracker += yDir[i];
      console.log(`Numcount : ${numCount}`);
      if (numCount >= 5) {
        stop = true; //exit nested for loop
        console.log("winner");
        console.log(stop);
      }
    }
    if (stop === true) {
      break;
    }
  }
}

checkWinner(4, 4, arrWinX);