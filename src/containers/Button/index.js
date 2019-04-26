import React from 'react';

const Button = ({ onHandlerClick, btnText, modifier = 'uk-button-default' }) => {
  return (
    <React.Fragment>
      <button className={`uk-button ${modifier}`} type="button" onClick={onHandlerClick}>{btnText}</button>
    </React.Fragment>
  );
};

export default Button;
