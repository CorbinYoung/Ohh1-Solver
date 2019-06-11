import React, { useState } from 'react';
import './css/games.css';
import Box from './Box';
import solver from '../../js/algorithm';
import { getChanged } from '../../js/utils';

const initialBoxes = size => Array.from({ length: Math.pow(size, 2) }).map(_ => 0);

const App = ({ size }) => {
  const [boxes, setBoxes] = useState(initialBoxes(size));
  const [history, setHistory] = useState([]);

  return (
    <div className={`game-${size}`}>
      <div className={`board-${size}`}>
        {boxes.map( (_, i) => (
          <Box
            key={i}
            color={boxes[i]}
            setColor={num => {
              const newBoxes = boxes.slice();
              newBoxes[i] = num;
              setBoxes(newBoxes);
            }}
          />
        ))}
      </div>
      <div className="buttons">
      <input
          className="solve"
          type="button"
          value="Solve"
          onClick={ () => {
            const hist = solver(boxes);
            setBoxes(hist[hist.length - 1]);
            setHistory(hist);
          }}
        />
        <input
          className="reset"
          type="button"
          value="Reset"
          onClick={ () => {
            setBoxes(initialBoxes(size));
            setHistory([]);
          }}
        />
      </div>
      <div className="history">
          <div className="historyTitle">History</div>
          <div className="moves">
              {history.map( (move, i) => {
                let row, col, color;
                if(i !== 0) {
                  const obj = getChanged(history[i-1], move, size);
                  row = obj.row;
                  col = obj.col;
                  color = obj.color;
                }
                return (
                  <div key={i} onClick={() => setBoxes(history[i])}>
                    { (row !== undefined && col !== undefined)
                      ? `Row: ${row + 1} Col: ${col + 1} Color: ${color}`
                      : `Starting positions`
                    }
                  </div>
                );
              })}
          </div>
      </div>
    </div>
  );
}

export default App;
