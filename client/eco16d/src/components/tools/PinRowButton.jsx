import React from 'react';
import PinImg from '../icons/pin-svgrepo-com.svg'
import axios from 'axios';

const styles = {
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
}

function PinRowButton({ selectedCell, setP, setPin }) {
  const handlePin = () => {
    if (selectedCell) {
      fetchPin();
    }
  }

  const fetchPin = () => {
    axios.get(`http://localhost:3001/getPin/${selectedCell._id}`)
      .then(response => {
        const currentPin = response.data.pin;
        const newPin = !currentPin;
        console.log("pinning to: " + newPin)
        setPin(newPin);
        setP(prevP => prevP + 1);
        console.log("pinning to: " + newPin)
      })
      .catch(err => {
        console.log('Error fetching pin:', err);
      });
  }

  return (
    <button onClick={handlePin} style={styles}>
      <img src={PinImg} style={{ width: '18px', height: '18px' }} />
    </button>
  );
}

export default PinRowButton;
