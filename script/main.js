"use strict"

const medBoardDimension = 2; //select dimension of board
let allMediumArr = [];
///////////////
//Generate Medium and Small box
//////////////

function generateArray() {
  for (let i = 0; i < medBoardDimension ** 2; i++) {
    allMediumArr[i] = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  }
}

generateArray();
console.log(allMediumArr);

function generateMedBoard(num) {
  const largeBoard = document.querySelector('.board-large');
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      let newMedBoard = document.createElement('div');
      newMedBoard.className = "board-medium";
      const medBoardIndex = i * 2 + j * 1
      newMedBoard.id = `m${medBoardIndex}`;
      largeBoard.append(newMedBoard);
    }
  }
}

function generateSmallBoard() {
  const mediumBoard = document.querySelectorAll(".board-medium");
  for (let item of mediumBoard) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const newSmallBoard = document.createElement('div');
        newSmallBoard.className = "board-small";
        newSmallBoard.id = `${item.id},${i},${j}`;
        item.append(newSmallBoard);
      }
    }
  }
}

generateMedBoard(2);
generateSmallBoard();


//////////////
//
//////////////


let value = 1;
document.querySelector('.board-large').addEventListener('click', function (e) {
  const smallBoardId = e.target.id;

  putStone(smallBoardId, allMediumArr, value);
  if (value === 1) {
    e.target.style.backgroundColor = "black";
    value = 2;
  } else {
    e.target.style.backgroundColor = "white";
    value = 1;
  }

  let combineArray = combineArrayVertical(combineArrayHorizontal(allMediumArr[0], allMediumArr[1]), combineArrayHorizontal(allMediumArr[2], allMediumArr[3]));

  console.log(combineArray);
  console.log(checkWinner(combineArray));
});