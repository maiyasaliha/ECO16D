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
  'agTextCellEditor', 
  'agCheckboxCellEditor', 
  'agDateCellEditor', 
  'agDateStringCellEditor', 
  'agLargeTextCellEditor',
  'agSelectCellEditor',
  'agNumberCellEditor'
];

const defaultOption = options[0];

function CellRendererButton({ selectedCell, setR, setCellRenderer }) {
    
    const handleRenderChange = (render) => {
        if (selectedCell) {
            setCellRenderer(render);
            console.log(render)
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
            <Dropdown options={options} onChange={handleRenderChange} value={defaultOption} />
        </div>
    );
}

export default CellRendererButton;
