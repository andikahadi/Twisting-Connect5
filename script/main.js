"use strict"

const medBoardDimension = 2; //dimension of medium board (each medium board is 3x3 small board)

/////////////////////////
//Function: Generate Array
/////////////////////////


let allMediumArr = []; // array storing medium board 2D array

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

/////////////////////////////////
//Function: Generate Medium and Small box
////////////////////////////////

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

generateMedBoard(medBoardDimension);
generateSmallBoard();


///////////////////////////////
//Function: Checking valid move for stone placement
///////////////////////////////

let rotateDone = true; //this track whether player already make rotation, false is have not.

function validMove(idString) {
  let coorArr = getCoordinates(idString); //receive input from clicked small board.
  let x;
  let y;
  const medBoardId = idString.charAt(1);
  for (let i = 0; i < coorArr.length; i += 2) {
    y = parseInt(coorArr[i]); //y represent row (i)
    x = parseInt(coorArr[i + 1]); //x represent column (j)
  }
  let medArr = allMediumArr[medBoardId];

  if (medArr[y][x] === 0 && rotateDone === true) {
    return true; //move is valid if small board clicked is empty (value == 0), and previous player already rotate board.
  } else {
    return false;
  }
}


///////////////////////////
//Event Listener. firstMove: Place Stone. secondMove: Rotate Medium Board
///////////////////////////

let value = 1;
let smallBoardIdArr = []
let winner = false;


document.querySelector('.board-large').addEventListener('click', firstMove);

function firstMove(e) {
  let smallBoard = e.target;
  const smallBoardId = e.target.id; //store id of small board clicked (format: medBoardId,row,column  --> m0,0,0)


  if (validMove(smallBoardId)) {
    smallBoardIdArr.push(smallBoardId); //track id of first valid move
    // console.log(smallBoardIdArr);
    if (value === 1) {
      createMaki(smallBoard);
      // e.target.style.backgroundImage = "url(/resources/maki-pixel.gif)";
      putStone(smallBoardId, allMediumArr, value);
      value = 2;
      rotateDone = false;
    } else {
      createNigiri(smallBoard);
      // e.target.style.backgroundImage = "url(/resources/nigiri.gif)";
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
  const firstSmallBoardClickedId = smallBoardIdArr.shift(); //get the first valid move id
  smallBoardIdArr.length = 0; //reset array of valid move id to empty
  const firstSmallBoardClicked = document.getElementById(`${firstSmallBoardClickedId}`);
  let medBoard = firstSmallBoardClicked.parentNode;
  let medBoardId = medBoard.id.charAt(1); //get id of medium board clicked, use the integer to access 2D array of that medium board 
  let sushiInside = document.querySelectorAll(`.${medBoard.id}-sushi`);
  if (e.target.id === 'clockwise') {
    clockwiseRotate(allMediumArr[medBoardId])
    for (let item of sushiInside) {
      item.style.transition = ".5s ease-in-out";
      item.style.transform = 'rotate(-90deg)';
    }
    console.log(sushiInside);

    medBoard.style.transition = ".5s ease-in-out"; //css rotation
    medBoard.style.transform = 'rotate(90deg)'; //css rotation
  } else if (e.target.id === 'counter') {
    counterCwRotate(allMediumArr[medBoardId])
    for (let item of sushiInside) {
      item.style.transition = ".5s ease-in-out";
      item.style.transform = 'rotate(90deg)';
    }
    medBoard.style.transition = ".5s ease-in-out";
    medBoard.style.transform = 'rotate(-90deg)';
  }
  rotateDone = true; //allows next user to place stone

  setTimeout(() => { //timeout is used to allow css transition to complete, then med board is re printed on screen based on array.
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

        medBoard.append(newSmallBoard);
        if (medArrRotated[i][j] === 1) {
          createMaki(newSmallBoard);
          // newSmallBoard.style.backgroundImage = "url(/resources/maki-pixel.gif)";
        } else if (medArrRotated[i][j] === 2) {
          createNigiri(newSmallBoard);
          // newSmallBoard.style.backgroundImage = "url(/resources/nigiri.gif)";
        }
      }
    }

    //combine all four 2D medium array into one 2D array
    let combineArray = combineArrayVertical(combineArrayHorizontal(allMediumArr[0], allMediumArr[1]), combineArrayHorizontal(allMediumArr[2], allMediumArr[3]));

    console.log(combineArray);
    //check whether there's a winner in combined array
    checkWinner(combineArray);
    //if there is a winner, show who win and reset array
    if (winner) {
      if (value === 2) {
        document.querySelector(".player-one-turn").innerText = "Maki Win !";
        document.querySelector('.board-large').removeEventListener('click', firstMove);
        document.querySelector('#player-one-crown').style.visibility = "visible";
      } else {
        document.querySelector(".player-two-turn").innerText = "Nigiri Win !"
        document.querySelector('.board-large').addEventListener('click', firstMove);
        document.querySelector('#player-two-crown').style.visibility = "visible";
      }
    } else {
      if (value === 2) {
        document.querySelector(".player-two-turn").style.visibility = "visible";
        document.querySelector(".player-one-turn").style.visibility = "hidden";
      } else {
        document.querySelector(".player-two-turn").style.visibility = "hidden";
        document.querySelector(".player-one-turn").style.visibility = "visible";
      }
    }
    //show and hide player turn




  }, 550);

}