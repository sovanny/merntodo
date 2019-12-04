import React from 'react';
import './FloatButton.css';

function FloatButton(props) {

    return (
        <div className="float-btn" onClick={ props.handleClick }></div>
    )
  }

export default FloatButton;