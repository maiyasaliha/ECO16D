import React, { useState, useEffect } from 'react';
import ClearFormatImg from "../icons/clear-formatting-svgrepo-com.svg"

function ClearFormatting({ selectedCell, setClear }) {
    const onChangeHandler = () => {
        setClear(true);
    };

    useEffect(() => {
        if (selectedCell) {
            console.log(`Selected cell at row ${selectedCell.rowIndex}, column ${selectedCell.colId}`);
        }
    }, [selectedCell]);

    return (
        <div>
            <button onClick={onChangeHandler}>
                <img src={ClearFormatImg} style={{ width: '18px', height: '18px' }}/>
            </button>
        </div>
    );
}

export default ClearFormatting;
