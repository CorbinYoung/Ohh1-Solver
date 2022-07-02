import React, { useState } from 'react';
import Game from './components/Game';

const SizeBox = ({ text, background, onClick }) => (
  <div onClick={onClick} style={{ background, color: 'white', padding: '8px 16px 8px 16px', borderRadius: '15px' }}>{text}</div>
);

const App = () => {
  const [size, setSize] = useState(null);

  return size ? (
      <Game size={size} changeSize={() => setSize(null)} />
    ): (
    <div style={{ fontFamily: 'source-code-pro, Menlo', background: '#222222', height: '100vh' }}>
      <h1 style={{ padding: '16px', textAlign: 'center', color: 'white' }}>Select a Size</h1>
      <div style={{ marginTop: '24px', marginLeft: 'auto', marginRight: 'auto', width: '500px', display: 'flex', justifyContent: 'space-evenly' }}>
        {[4, 6, 8, 10, 12].map((num, index) => <SizeBox key={num} text={num} background={index % 2 ? '#bb4422' : '#00aaaa'} onClick={() => setSize(num)} />)}
      </div>
    </div>
  )
};

export default App;
