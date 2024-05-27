import React from 'react';

function BoldButton() {
  const handleBold = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const isBold = document.queryCommandState('bold');

    document.execCommand('bold', false, !isBold);
  };

  return (
    <button onClick={handleBold}>Bold</button>
  );
}

export default BoldButton;
