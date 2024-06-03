import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import FontImg from '../icons/font-svgrepo-com.svg'

function FontColourPicker({ selectedCell, color, setColor }) {
    const [showPicker, setShowPicker] = useState(false);

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const onChangeHandler = (updatedColor) => {
        setColor(updatedColor.hex);
    };

    useEffect(() => {
        if (selectedCell) {
            console.log(`Selected cell at row ${selectedCell.rowIndex}, column ${selectedCell.colId}`);
        }
    }, [selectedCell]);

    return (
        <div>
            <button onClick={togglePicker}>
                <img src={FontImg} style={{ width: '18px', height: '18px' }}/>
            </button>
            {showPicker && (
                <SketchPicker
                    color={color}
                    onChange={onChangeHandler}
                />
            )}
        </div>
    );
}

export default FontColourPicker;
