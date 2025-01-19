import React from 'react';

const NextText = ({ text, color }) => {

  const beforeStyle = {
    content: "''",
    position: 'absolute',
    top: '50%',
    left: '-19px',
    transform: 'translateY(-50%) rotate(90deg)',
    width: '0',
    height: '0',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderBottom: `11px solid ${color}`,
  };

  const textStyle = {
    position: 'fixed',
    right: '32px',
    bottom: '32px',
    fontSize: '20px',
    color: color,
  };

  return (
    <p className="relative" style={textStyle}>
      <span style={beforeStyle}></span>
      {text}
    </p>
  );
};

export default NextText;
