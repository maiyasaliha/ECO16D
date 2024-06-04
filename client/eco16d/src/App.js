import React, { useState } from 'react';
import Spreadsheet from "./components/Spreadsheet";
import ColourPicker from "./components/tools/BgColourPicker";
import FontColourPicker from './components/tools/FontColourPicker';
import ClearFormatting from './components/tools/ClearFormatting';
import BoldButton from './components/tools/BoldButton';
import ItalicButton from './components/tools/ItalicButton';
import SizeButton from './components/tools/SizeButton';
import UnderlineButton from './components/tools/UnderlineButton';
import StrikethroughButton from './components/tools/StrikethroughButton';
import FontPickerButton from './components/tools/FontPickerButton';
import WrapTextButton from './components/tools/WrapTextButton';

function App() {
    const [selectedCell, setSelectedCell] = useState(null);
    const [bgcolor, setBgColor] = useState('#ffffff');
    const [color, setColor] = useState('#000000');
    const [fontFamily, setFontFamily] = useState('Arial');
    const [italic, setItalic] = useState("normal");
    const [bold, setBold] = useState("normal");
    const [underline, setUnderline] = useState(false);
    const [strikeThrough, setStrikeThrough] = useState('none');
    const [clear, setClear] = useState(false);
    const [wrapText, setWrapText] = useState(false);
    const [b, setB] = useState(0);
    const [i, setI] = useState(0);
    const [s, setS] = useState(0);
    const [u, setU] = useState(0);
    const [w, setW] = useState(0);
    const [fontSize, setFontSize] = useState(14);
    const [textAlign, setTextAlign] = useState('left');
    const [verticalAlign, setVerticalAlign] = useState('middle');
    const [format, setFormat] = useState(false);
    const [locked, setLocked] = useState(false);
    const [cellRenderer, setCellRenderer] = useState(false);

    return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
            <FontPickerButton 
                selectedCell={selectedCell}
                fontFamily={fontFamily}
                setFontFamily={setFontFamily}
            />
            <ColourPicker 
                selectedCell={selectedCell} 
                color={bgcolor} 
                setColor={setBgColor} 
            />
            <FontColourPicker
                selectedCell={selectedCell} 
                color={color} 
                setColor={setColor} 
            />
            <ClearFormatting 
                selectedCell={selectedCell}
                setClear={setClear}
            />
            <BoldButton 
                selectedCell={selectedCell}
                setBold={setBold}
                setB={setB}
            />
            <ItalicButton 
                selectedCell={selectedCell}
                setItalic={setItalic}
                setI={setI}
            />
            <UnderlineButton 
                selectedCell={selectedCell}
                setUnderline={setUnderline}
                setU={setU}
            />
            <StrikethroughButton 
                selectedCell={selectedCell}
                setStrikeThrough={setStrikeThrough}
                setS={setS}

            />
            <SizeButton 
                selectedCell={selectedCell}
                fontSize={fontSize}
                setFontSize={setFontSize}
            />
            <WrapTextButton 
                selectedCell={selectedCell}
                setW={setW}
                setWrapText={setWrapText}
            />
          </div>
            <Spreadsheet 
                selectedCell={selectedCell} 
                setSelectedCell={setSelectedCell} 
                bgcolor={bgcolor} 
                color={color} 
                clear={clear}
                setClear={setClear}
                bold={bold}
                b={b}
                italic={italic}
                i={i}
                underline={underline}
                u={u}
                strikeThrough={strikeThrough}
                s={s}
                fontFamily={fontFamily}
                w={w}
                wrapText={wrapText}
                fontSize={fontSize}
                setFontSize={setFontSize}
            />
        </div>
    );
}

export default App;
