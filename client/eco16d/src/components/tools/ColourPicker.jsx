import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

function ColourPicker() {
    const [color, setColor] = useState('#ffffff');
    const [showPicker, setShowPicker] = useState(false);

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    const onChangeHandler = (updatedColor) => {
        setColor(updatedColor.hex);
    };

    return (
        <div>
            <button onClick={togglePicker}>Toggle Color Picker</button>
            {showPicker && (
                <SketchPicker
                    color={color}
                    onChange={onChangeHandler}
                />
            )}
        </div>
    );
}

export default ColourPicker;
