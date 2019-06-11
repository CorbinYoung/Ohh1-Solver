const isFinished = boxes => boxes.find(box => box === 0) === undefined;

export const getRow = (index, size) => Math.trunc(index / size);

export const getCol = (index, size) => index % size;

const getWholeRow = (boxes, row, size) =>
	boxes.filter( (v, index) => getRow(index, size) === row);

const getWholeCol = (boxes, col, size) =>
	boxes.filter( (v, index) => getCol(index, size) === col);

const getAllRows = (boxes, size) => {
	const rows = [];

	for(let i = 0; i < size; i++) {
		rows.push(getWholeRow(boxes, i, size));
	}

	return rows;
};

const getAllCols = (boxes, size) => {
	const cols = [];

	for(let i = 0; i < size; i++) {
		cols.push(getWholeCol(boxes, i, size));
	}

	return cols;
}

const isMatch = (set1, set2) =>
	set1.reduce((accum, curVal, curInd) => ({
			match: accum.match && (curVal === set2[curInd] || set2[curInd] === 0),
			indexes: set2[curInd] === 0 ? [...accum.indexes, curInd] : accum.indexes
	}), { match: true, indexes: [] });

const getIndex = size => (row, col) => (row * size) + col;

const move = (boxes, index, value) => {
	const newBoxes = boxes.slice();
	newBoxes[index] = value;
	return newBoxes;
};

export default boxes => {
	const history = [boxes];
	let current = history[0];
	const size = Math.sqrt(boxes.length);

	const calcIndex = getIndex(size);

	while(!isFinished(current)) {
		// Check rows
		for(let row = 0; row < size; row++) {
			const wholeRow = getWholeRow(current, row, size);

			if(!isFinished(wholeRow)) {
				// Check if already has all of one color
				const num1 = wholeRow.filter(v => v === 1).length;
				const num2 = wholeRow.filter(v => v === 2).length;

				if(num1 === (size / 2)) {
					for(let i = 0; i < size; i++) {
						if(wholeRow[i] === 0) {
							history.push(current = move(current, calcIndex(row, i), 2));
						}
					}
				} else if(num2 === (size / 2)) {
					for(let i = 0; i < size; i++) {
						if(wholeRow[i] === 0) {
							history.push(current = move(current, calcIndex(row, i), 1));
						}
					}
				}

				// Check for pairs or sandwiches
				for(let i = 0; i < size - 1; i++) {
					if(wholeRow[i] === wholeRow[i + 1] && wholeRow[i] !== 0) {
						if(i !== 0 && wholeRow[i - 1] === 0) {
							history.push(current = move(current, calcIndex(row, i - 1), wholeRow[i] === 1 ? 2 : 1));
						}

						if((i + 2) < size && wholeRow[i + 2] === 0) {
							history.push(current = move(current, calcIndex(row, i + 2), wholeRow[i] === 1 ? 2 : 1));
						}
					} else if((i + 2) < size && wholeRow[i] === wholeRow[i + 2] && wholeRow[i] !== 0 && wholeRow[i + 1] === 0) {
						history.push(current = move(current, calcIndex(row, i + 1), wholeRow[i] === 1 ? 2 : 1));
					}
				}
			}

			// Compare two rows to see if they are the same
			if(isFinished(wholeRow)) {
				const allRows = getAllRows(current, size);

				for(let nextRow = 0; nextRow < size; nextRow++) {
					if(isFinished(allRows[nextRow])) continue;

					const { match, indexes } = isMatch(wholeRow, allRows[nextRow]);

					if(match) {
						if(indexes.length === 2) {
							history.push(current = move(current, calcIndex(nextRow, indexes[0]), wholeRow[indexes[0]] === 1 ? 2 : 1));
							history.push(current = move(current, calcIndex(nextRow, indexes[1]), wholeRow[indexes[1]] === 1 ? 2 : 1));
							break;
						}
					}
				}
			}
		}

		// Check columns
		for(let col = 0; col < size; col++) {
			const wholeCol = getWholeCol(current, col, size);

			if(!isFinished(wholeCol)) {
				// Check if already has all of one color
				const num1 = wholeCol.filter(v => v === 1).length;
				const num2 = wholeCol.filter(v => v === 2).length;

				if(num1 === (size / 2)) {
					for(let i = 0; i < wholeCol.length; i++) {
						if(wholeCol[i] === 0) {
							history.push(current = move(current, calcIndex(i, col), 2));
						}
					}
				} else if(num2 === (size / 2)) {
					for(let i = 0; i < wholeCol.length; i++) {
						if(wholeCol[i] === 0) {
							history.push(current = move(current, calcIndex(i, col), 1));
						}
					}
				}

				// Check for pairs or sandwiches
				for(let i = 0; i < size - 1; i++) {
					if(wholeCol[i] === wholeCol[i + 1] && wholeCol[i] !== 0) {
						if(i !== 0 && wholeCol[i - 1] === 0) {
							history.push(current = move(current, calcIndex(i - 1, col), wholeCol[i] === 1 ? 2 : 1));
						}

						if((i + 2) < size && wholeCol[i + 2] === 0) {
							history.push(current = move(current, calcIndex(i + 2, col), wholeCol[i] === 1 ? 2 : 1));
						}
					} else if((i + 2) < size && wholeCol[i] === wholeCol[i + 2] && wholeCol[i] !== 0 && wholeCol[i + 1] === 0) {
						history.push(current = move(current, calcIndex(i + 1, col), wholeCol[i] === 1 ? 2 : 1));
					}
				}
			}

			// Compare two columns to see if they are the same
			if(isFinished(wholeCol)) {
				const allCols = getAllCols(current, size);

				for(let nextCol = 0; nextCol < size; nextCol++) {
					if(isFinished(allCols[nextCol])) continue;

					const { match, indexes } = isMatch(wholeCol, allCols[nextCol]);

					if(match) {
						if(indexes.length === 2) {
							history.push(current = move(current, calcIndex(indexes[0], nextCol), wholeCol[indexes[0]] === 1 ? 2 : 1));
							history.push(current = move(current, calcIndex(indexes[1], nextCol), wholeCol[indexes[1]] === 1 ? 2 : 1));
							break;
						}
					}
				}
			}
		}
	}

	return history;
}