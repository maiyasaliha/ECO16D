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

function CellFormatButton({ selectedCell, setF, setFormat, setE, setEditor }) {
    
    const handleFormatChange = (format) => {
        if (selectedCell) {
            console.log(selectedCell)
            setFormat(format);
            console.log("format is " + format.value)
            setF(prevF => prevF + 1)
            if (format.value === 'date') {
                setEditor('agDateCellEditor')
                setE(prevE => prevE + 1)
            }
            if (format.value === 'dateString') {
                setEditor('agDateStringCellEditor')
                setE(prevE => prevE + 1)
            }
            if (format.value === 'number') {
                setEditor('agNumberCellEditor')
                setE(prevE => prevE + 1)
            }
            if (format.value === 'boolean') {
                setEditor('agCheckboxCellEditor')
                setE(prevE => prevE + 1)
            }
            if (format.value === 'text') {
                setEditor('agTextCellEditor')
                setE(prevE => prevE + 1)
            }
        }
    };

    return (
        <div>
            <Dropdown options={options} onChange={handleFormatChange} value={defaultOption} />
        </div>
    );
}

export default CellFormatButton;
