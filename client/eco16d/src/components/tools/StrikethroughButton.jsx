import React from 'react'
import StrikeImg from '../icons/strikethrough-svgrepo-com.svg'

function StrikethroughButton({selectedCell, setStrikeThrough}) {
  const handleStrike = () => {
    if (selectedCell) {
      setStrikeThrough(true);
    }
  }
  return (
    <button onClick={handleStrike}>
      <img src={StrikeImg} style={{ width: '18px', height: '18px' }}/>
    </button>
  )
}

export default StrikethroughButton