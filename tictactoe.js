const rows = document.querySelectorAll('tr');
let matrix = [];
let turnNumber = 0;
let globalChar;
for (let row of rows) {
  let mRow = [];
  for (let cell of row.cells) {
    cell.clicked = false;
    cell.addEventListener('click', () => {
      if (!cell.clicked) {
        if (turnNumber % 2 === 0) {
          cell.innerText = 'O'
        } else {
          cell.innerText = 'X'
        }
        turnNumber++;
        cell.clicked = true;
        checkIfWon(matrix);
      }
    });
    mRow.push(cell);
  }
  matrix.push(mRow);
}

document.querySelector('button').addEventListener('click', () => {
  location.reload();
})

function checkIfWon(matrix) {
  if (turnNumber >= 5 && (checkRows(matrix) || checkColumns(matrix) || checkDiagonals(matrix))) {
    setTimeout(() => {
      alert(`${globalChar}'s wins!!!`);
      location.reload();
    }, 0);
  }
}

function checkRows(matrix) {
  for (let rows of matrix) {
    let count = 0;
    var char = rows[0].innerText;
    if (char === 'O' || char === 'X') {
      for (let cell of rows) {
        if (cell.innerText !== char) {
          break;
        } else {
          count++;
        }
      }
      if (count === 3) {
        globalChar = char;
        return true;
      }
    }
  }
  return false;
}

function checkColumns(matrix) {
  for (let colI = 0; colI < matrix[0].length; colI++) {
    let count = 0;
    var char = matrix[0][colI].innerText;
    if (char === 'O' || char === 'X') {
      for (let rowI = 0; rowI < matrix.length; rowI++) {
        let cell = matrix[rowI][colI];
        if (cell.innerText !== char) {
          break;
        } else {
          count++;
        }
      }
      if (count === 3) {
        globalChar = char;
        return true;
      }
    }
  }
  return false;
}

function checkDiagonals(matrix) {
  let topLeft = matrix[0][0].innerText;
  let topRight = matrix[0][2].innerText;
  let bottomLeft = matrix[2][0].innerText;
  let bottomRight = matrix[2][2].innerText;
  let middle = matrix[1][1].innerText;
  if (topLeft === middle && middle === bottomRight) {
    globalChar = topLeft;
    return true;
  }
  if (topRight === middle && middle === bottomLeft) {
    globalChar = topRight;
    return true;
  }
  return false;
}