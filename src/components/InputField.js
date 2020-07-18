import React, { useEffect } from 'react';
import css from 'styled-jsx/css';

import handleAddress from '../helpers/handleAddress';

const style = css`
  input {
    border-radius: 4px;
    height: 32px;
    width: 86%;
    background-color: #f0f3f7;
    border: none;
    padding: 8px;
    color: #252525;
    font-size: 16px;
  }

  input::placeholder {
    color: #8596a6;
  }
`;

const InputField = ({
  placeholder,
  name,
  handleChange,
  handleBlur,
  address,
  setDeliveryData,
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      await handleAddress(address, name, setDeliveryData);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [address]);
  return (
    <>
      <input
        id="dropOff"
        placeholder={placeholder}
        type="text"
        name={name}
        value={address}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <style jsx>{style}</style>
    </>
  );
};

export default InputField;
