"use strict"

// Function: getCoordinates --> get the row and column of 3x3 small array
function getCoordinates(idString) {
  const newArr = idString.split(',');
  newArr.shift();
  return newArr;
}


// console.log(getCoordinates("M1,3,3"));

// const smallArr1 = [
//   [1, 2, 3],
//   [7, 8, 9],
//   [13, 14, 15]
// ];


///////////////////////////
//Function putStone: push value to array of clicked medium board. does not change the color in front-end
///////////////////////////

function putStone(idString, allMediumArr, value) {
  //click smallBoard, get id, get coordinate
  let coorArr = getCoordinates(idString);
  let x;
  let y;
  const medBoardId = idString.charAt(1);
  for (let i = 0; i < coorArr.length; i += 2) {
    y = parseInt(coorArr[i]);
    x = parseInt(coorArr[i + 1]);
  }
  let medArr = allMediumArr[medBoardId];

  medArr[y][x] = value;
  // console.log(`x: ${x}  y: ${y} medArr[${y}][${x}] : ${medArr[y][x]}`);
}

// putStone("M1,2,2", smallArr1, 2);
// console.log(smallArr1);