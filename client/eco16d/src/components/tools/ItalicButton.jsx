import React from 'react'
import ItalicImg from '../icons/italic-svgrepo-com.svg'

function ItalicButton({selectedCell, italic, setItalic}) {
  const handleItalic = () => {
    if (selectedCell) {
      setItalic(true);
    }
  }
  return (
    <button onClick={handleItalic}>
      <img src={ItalicImg} style={{ width: '18px', height: '18px' }}/>
    </button>
  )
}

export default ItalicButton