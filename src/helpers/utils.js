// checks neighbors and determines 1 or 0
export function brain(row, col, gridArr) {
  let neighborCount = 0;
  let currentCell;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (gridArr[row + i] && gridArr[col + j]) {
        if (row + i === row && col + j === col) {
          currentCell = gridArr[row + i][col + j];
        } else {
          // console.log(`gridArr[${row + i}][${col + j}] = ${gridArr[row + i][col + j]}`);
          if (gridArr[row + i][col + j]) neighborCount++;
        }
      }
    }

  }

  // if: Populated cell conditional is between 2 to 3 is true, everything else is 0.
  // else: Empty cell evenly divisible by 3 is true, everything else is 0.
  if (currentCell) {
    return (neighborCount > 1 && neighborCount < 4) ? 1 : 0;
  }

  return (neighborCount !== 0 && neighborCount % 3 === 0) ? 1 : 0;
};
