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

let rotateDone = true;

function validMove(idString) {
  let coorArr = getCoordinates(idString);
  let x;
  let y;
  const medBoardId = idString.charAt(1);
  for (let i = 0; i < coorArr.length; i += 2) {
    y = parseInt(coorArr[i]);
    x = parseInt(coorArr[i + 1]);
  }
  let medArr = allMediumArr[medBoardId];

  if (medArr[y][x] === 0 && rotateDone === true) {
    return true;
  } else {
    return false;
  }
}

// let smallBoard;

// while (winner === false && moveCount <= 36) {

let value = 1;
let smallBoard;

document.querySelector('.board-large').addEventListener('click', firstMove);

function firstMove(e) {
  // e.stopImmediatePropagation();
  // this.removeEventListener('click', firstMove)
  smallBoard = e.target;
  const smallBoardId = e.target.id;

  if (validMove(smallBoardId)) {
    if (value === 1) {
      e.target.style.backgroundColor = "black";
      putStone(smallBoardId, allMediumArr, value);
      value = 2;
      rotateDone = false;
    } else {
      e.target.style.backgroundColor = "white";
      putStone(smallBoardId, allMediumArr, value);
      value = 1;
      rotateDone = false;
    }
  } else {
    alert("not a valid move");
  }

  document.querySelector('.move-box').addEventListener('click', secondMove);
};

function secondMove(e) {
  console.log(smallBoard);
  let medBoard = smallBoard.parentNode;
  rotateDone = true;
  let medBoardId = medBoard.id.charAt(1);
  if (e.target.id === 'clockwise') {
    clockwiseRotate(allMediumArr[medBoardId])
    medBoard.style.transition = ".5s ease-in-out";
    medBoard.style.transform = 'rotate(90deg)';
  } else if (e.target.id === 'counter') {
    counterCwRotate(allMediumArr[medBoardId])
    medBoard.style.transition = ".5s ease-in-out";
    medBoard.style.transform = 'rotate(-90deg)';
  }

  setTimeout(() => {
    medBoard.style.transition = "0s";
    medBoard.style.transform = 'rotate(0deg)';
    while (medBoard.hasChildNodes()) {
      medBoard.removeChild(medBoard.firstChild)
    }
    const medArrRotated = allMediumArr[medBoardId];
    for (let i = 0; i < medArrRotated.length; i++) {

      for (let j = 0; j < medArrRotated[0].length; j++) {
        const newSmallBoard = document.createElement('div');
        newSmallBoard.className = "board-small";
        newSmallBoard.id = `${medBoard.id},${i},${j}`;
        if (medArrRotated[i][j] === 1) {
          newSmallBoard.style.backgroundColor = "black";
        } else if (medArrRotated[i][j] === 2) {
          newSmallBoard.style.backgroundColor = "white";
        }
        medBoard.append(newSmallBoard);
      }
    }

    //combine all 4 medium array into 1 array
    let combineArray = combineArrayVertical(combineArrayHorizontal(allMediumArr[0], allMediumArr[1]), combineArrayHorizontal(allMediumArr[2], allMediumArr[3]));

    console.log(combineArray);
    //check whether there's a winner in combined array
    checkWinner(combineArray);
  }, 1000);

}