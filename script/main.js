"use strict"
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