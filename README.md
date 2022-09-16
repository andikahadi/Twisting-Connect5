technologies used, the approach taken, installation instructions, unsolved problems, etc.

-- Game Info --
Twisting Connect 5 is a 2 person turn-based game, which each player's goal is to create one 5-in-a-row in any direction (row, column, or diagonal).
The board used in this project is a 2x2 medium board, with each medium box consist of 3x3 small boxes.

Each players turn consist of 2 moves: put stone at any empty small boxes, and rotate the medium board 90degree either to clockwise or counterclockwise direction.

-- Technologies Used --
HTML, CSS, Javascript

-- Approach --

1. Generate array and Board (in main.js)
   Each medium board (3x3) is represented by a 2d array of same dimension. For this version, there are 4 medium boards, the 4 medium array is stored in variable allMediumArr. The index of allMediumArr represent medium board in order as below.

   ***

   \ 0 \ 1 \

   ***

   \ 2 \ 3 \

   ***

generateMedBoard(num) function create board of dimension num x num, currently num is fixed at 2. Each board has unique id, from m0 to m3, which later will be used to link it to array in allMediumArr.

generateSmallBoard function generates 3x3 small box in each medium board, with unique id format : medBoardId,i,j. Initial value of each box is 0, later used to differentiate empty boxes.

2. Checking Valid Move (in main.js)
   validMove(idString) function received id of small box clicked, giving information on medium board location, and small box row and column. if value of small box is not 0, and previous player has rotate medium box (tracked by var rotateDone), then the box clicked is valid.

3. Put Stone, Create maki, Create Nigiri(in putStone.js)
   putStone(idString, allMediumArr, value) received info of medium board and small box location from idString, push assign user value (1 for maki, 2 for nigiri) to the correct array.
   While putStone is handling array data, the front end Javascript DOM is happening in createMaki(smallBoard) and createNigiri(smallBoard) function, which append a new div with sushi image to div of small box selected.

4. Rotate function (in combineArray.js)
   The algorithm to rotate 90 degree consist of 2 For-Loops. The first one is to swap the element diagonaly (Arr[i][j] <--> Arr[j][i]), and second one is to swap it horizontally (clockwise) or vertically (counter-clockwise). The functions clockwiseRotate(smallArr) and counterCwRotate(smallArr) receive input of small box previously clicked in putStone, and rotate the parent, a medium board.

5. Combine four medium board array into one 6x6 array (in combineArray.js)
   After each player's turn (put stone and rotate medium board), 4 arrays representing respective medium board are combined using for-loops. I split it to two functions, one is combining horizontal, and the other one is combining vertical. The result is a 6x6 array toe be used in checking 5-in-a-row.

6. Scanning for 5-in-a-row pattern (in checkWinner.js)
   For-loop is used to scan through the 6 rows, 6 column, 6 incline diagonals, and 6 decline diagonals.
   Diagonal traverse is interesting because the first half use i (rows) as starting point, while 2nd half after the longest diagonal use j (columns) as starting point.

   In each of the traverse it checks value of each box in the line, skip if value is 0, add count to consecutiveCount if the value of current box is same as previous box, and reset if it's different.

7. Event Listener at the Board (in main.js)
   A click registered inside the board, will trigger firstMove(e) function. Sequence of event inside firstMove is as below

- check if move is valid, else throw an alert.
- check "value" (1 is maki, 2 is nigiri), run putStone() to map "value" to the array, run createMaki() or createNigiri(). change rotateDone to false, so that current player has to rotate board. lastly, change "value" to the value of next player.

8. Event Listener at Clockwise and Counter-clockwise (in main.js)
   a click registered inside rotate box, will trigger secondMove(e) function. Sequence of event inside secondMove is as below:

- get the id of medium array from location information during putStone.
- add css rotation to medium board, and counter rotation on each sushi inside.
- after rotation css animation is completed, recreate all div of small board to reflect information in array. the reason is CSS only rotate image, but does not change location of each small box with respect to back end array data.
- combine 4 medium array into one array. and run checkwinner algo on this combined array
- shows winner on profile
