import React from 'react';

const getColor = num => {
	switch(num) {
		case 1: return '#bb4422';
		case 2: return '#00aaaa';
		default: return '#2a2a2a';
	}
}

const Box = ({ color, setColor }) => (
	<div
		onClick={ () => setColor((color + 1) % 3) }
		style={{ background: getColor(color), borderRadius: '15px' }}
	/>
);

export default Box;