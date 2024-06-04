import React, { useState, useEffect } from 'react';
import SizeImg from '../icons/font-size-line-svgrepo-com.svg';
import axios from 'axios';

const styles = {
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
};

function SizeButton({ selectedCell, fontSize, setFontSize }) {
  
  useEffect(() => {
    if (selectedCell) {
      fetchSize();
    }
  }, [selectedCell]);

 
  const handleSizeChange = (event) => {
    if (selectedCell) {
      const size = parseInt(event.target.value, 10);
      if (!isNaN(size)) {
        setFontSize(size);
      }
    }
  };

  const fetchSize = () => {
    if (selectedCell) {
      axios.get(`http://localhost:3001/getCellProperty/${selectedCell._id}/${selectedCell.colId}/fontSize`)
        .then(response => {
          const currentSize = response.data[selectedCell.colId].fontSize;
          setFontSize(currentSize);
        })
        .catch(err => {
          console.log('Error fetching font size:', err);
        });
    }
  }

  return (
    <div>
        <input
          type="number"
          value={fontSize || ''}
          onChange={handleSizeChange}
          min={1}
          max={100}
          step={1}
          style={{ marginTop: '10px', padding: '5px', width: '50px', marginBottom: '10px' }}
        />
    </div>
  );
}

export default SizeButton;
