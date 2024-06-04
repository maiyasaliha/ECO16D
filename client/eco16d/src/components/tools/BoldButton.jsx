import React from 'react';
import BoldImg from '../icons/bold-svgrepo-com.svg'
import axios from 'axios';

function BoldButton({ selectedCell, setB, setBold }) {
  const handleBold = () => {
    if (selectedCell) {
      fetchBold();
    }
  }

  const fetchBold = () => {
    axios.get(`http://localhost:3001/getCellProperty/${selectedCell._id}/${selectedCell.colId}/fontWeight`)
      .then(response => {
        const currentWeight = response.data[selectedCell.colId].fontWeight;
        const newWeight = currentWeight === "bold" ? "normal" : "bold";
        console.log(newWeight);
        setBold(newWeight);
        setB(prevB => prevB + 1);
      })
      .catch(err => {
        console.log('Error fetching bold:', err);
      });
  }

  return (
    <button onClick={handleBold}>
      <img src={BoldImg} style={{ width: '18px', height: '18px' }} />
    </button>
  );
}

export default BoldButton;
