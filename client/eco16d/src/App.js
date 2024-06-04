import React, { useState } from 'react';
import Spreadsheet from "./components/Spreadsheet";
import ColourPicker from "./components/tools/BgColourPicker";
import FontColourPicker from './components/tools/FontColourPicker';
import ClearFormatting from './components/tools/ClearFormatting';
import BoldButton from './components/tools/BoldButton';
import ItalicButton from './components/tools/ItalicButton';
import FontStyleButton from './components/tools/FontStyleButton';
import SizeButton from './components/tools/SizeButton';
import UnderlineButton from './components/tools/UnderlineButton';
import StrikethroughButton from './components/tools/StrikethroughButton';

function App() {
    const [selectedCell, setSelectedCell] = useState(null);
    const [bgcolor, setBgColor] = useState('#ffffff');
    const [color, setColor] = useState('#000000');
    const [fontFamily, setFontFamily] = useState('Arial');
    const [fontSize, setFontSize] = useState(14);
    const [italic, setItalic] = useState("normal");
    const [bold, setBold] = useState("normal");
    const [underline, setUnderline] = useState(false);
    const [strikeThrough, setStrikeThrough] = useState('none');
    const [textAlign, setTextAlign] = useState('left');
    const [verticalAlign, setVerticalAlign] = useState('middle');
    const [wrapText, setWrapText] = useState(false);
    const [format, setFormat] = useState(false);
    const [locked, setLocked] = useState(false);
    const [cellRenderer, setCellRenderer] = useState(false);
    const [clear, setClear] = useState(false);
    const [b, setB] = useState(0);
    const [i, setI] = useState(0);
    const [s, setS] = useState(0);
    const [u, setU] = useState(0);

    return (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
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
            <SizeButton />
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
            />
        </div>
    );
}

export default App;
