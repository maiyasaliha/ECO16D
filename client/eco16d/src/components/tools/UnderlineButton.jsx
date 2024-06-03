import React from 'react'
import UnderlineImg from '../icons/format-underline-svgrepo-com.svg'

function UnderlineButton({selectedCell, setUnderline}) {
  const handleUnderline = () => {
    if (selectedCell) {
      setUnderline(true);
    }
  }
  return (
    <button onClick={handleUnderline}>
      <img src={UnderlineImg} style={{ width: '18px', height: '18px' }}/>
    </button>
  )
}

export default UnderlineButton