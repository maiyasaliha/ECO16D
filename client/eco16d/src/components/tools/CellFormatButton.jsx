import React, { useState } from 'react';
import RenderImg from '../icons/cell-full-svgrepo-com.svg'
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const styles = {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
}

const options = [
  'text', 'number', 'boolean', 'date', 'dateString'
];

const defaultOption = options[0];

function CellFormatButton({ selectedCell, setF, setFormat }) {
    
    const handleFormatChange = (format) => {
        if (selectedCell) {
            setFormat(format);
            console.log(format)
        }
    };

    // const fetchRender = () => {
    //     axios.get(`http://localhost:3001/getCellProperty/${selectedCell._id}/${selectedCell.colId}/cellRenderer`)
    //       .then(response => {
    //         const currentRender = response.data[selectedCell.colId].cellRenderer;
    //         const newRender = currentRender === 
    //         console.log(newRender);
    //         setCellRenderer(newRender);
    //         setR(prevR => prevR + 1);
    //       })
    //       .catch(err => {
    //         console.log('Error fetching bold:', err);
    //       });
    //   }

    return (
        <div>
            <Dropdown options={options} onChange={handleFormatChange} value={defaultOption} />
        </div>
    );
}

export default CellFormatButton;
