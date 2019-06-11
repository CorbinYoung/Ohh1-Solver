import { getRow, getCol } from './algorithm';

export const getChanged = (prevMove, nextMove, size) => {
	const index = prevMove.reduce((accum, curVal, curInd) => curVal !== nextMove[curInd] ? curInd : accum, undefined);
	return {
		row: getRow(index, size),
		col: getCol(index, size),
		color: nextMove[index] === 1 ? 'Red' : 'Blue'
	};
};