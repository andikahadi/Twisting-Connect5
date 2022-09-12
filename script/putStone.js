"use strict"

function getCoordinates(idString) {
  const newArr = idString.split(',');
  newArr.shift();
  return newArr;
}

console.log(getCoordinates("M1,3,3"));

const smallArr1 = [
  [1, 2, 3],
  [7, 8, 9],
  [13, 14, 15]
];


function putStone(idString, medArr, value) {
  //click smallBoard, get id, get coordinate
  let coorArr = getCoordinates(idString);
  let x;
  let y;

  for (let i = 0; i < coorArr.length; i += 2) {
    y = parseInt(coorArr[i]);
    x = parseInt(coorArr[i + 1]);
  }

  medArr[y][x] = value;


  console.log(`x: ${x}  y: ${y} medArr[${y}][${x}] : ${medArr[y][x]}`);
}

putStone("M1,2,2", smallArr1, 2);
console.log(smallArr1);