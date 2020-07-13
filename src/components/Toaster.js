import React from 'react';
import css from 'styled-jsx/css';

const style = css`
  .toaster {
    position: absolute;
    z-index: 10;
    top: 32px;
    right: 32px;
    padding: 10px;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    border-radius: 8px;
    background-color: rgba(51, 51, 51, 0.90);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.10), 0 1px 8px 0 rgba(0, 0, 0, 0.10);
    font-size: 16px;
    color: #FFFFFF;
  }
  p {
    margin: 0;
  }
`;

const Toaster = ({ useToaster }) => {
  const handleClick = () => useToaster(false);
  setTimeout(() => {
    useToaster(false);
  }, 5000);
  return (
    <div
      className="toaster"
      role="textbox"
      aria-readonly="true"
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleClick}
    >
      <p>Job has been created successfully!</p>
      <style jsx>{style}</style>
    </div>
  );
};

export default Toaster;
