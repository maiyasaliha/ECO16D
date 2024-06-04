import React from 'react';
import WrapImg from '../icons/wrap-text-svgrepo-com.svg'
import axios from 'axios';

const styles = {
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
}

function WrapTextButton({ selectedCell, setW, setWrapText }) {
  const handleWrap = () => {
    if (selectedCell) {
      fetchWrap();
    }
  }

  const fetchWrap = () => {
    axios.get(`http://localhost:3001/getCellProperty/${selectedCell._id}/${selectedCell.colId}/wrapText`)
      .then(response => {
        const currentWrap = response.data[selectedCell.colId].wrapText;
        const newWrap = !currentWrap;
        console.log(newWrap);
        setWrapText(newWrap);
        setW(prevW => prevW + 1);
      })
      .catch(err => {
        console.log('Error fetching wrap:', err);
      });
  }

  return (
    <button onClick={handleWrap} style={styles}>
      <img src={WrapImg} style={{ width: '18px', height: '18px' }} />
    </button>
  );
}

export default WrapTextButton;
