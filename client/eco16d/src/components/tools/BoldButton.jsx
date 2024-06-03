import React from 'react';
import BoldImg from '../icons/bold-svgrepo-com.svg'

function BoldButton({selectedCell, setBold}) {
  const handleBold = () => {
if (selectedCell) {
      setBold(true);
    }
}

  return (
    <button onClick={handleBold}>
      <img src={BoldImg} style={{ width: '18px', height: '18px' }}/>
    </button>
  );
}

export default BoldButton;
