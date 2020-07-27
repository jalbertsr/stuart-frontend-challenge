import React, { useState, useEffect } from 'react';
import css from 'styled-jsx/css';

import Badge from './Badge';
import InputField from './InputField';
import { createJob } from '../services';
import handleAddress from '../helpers/handleAddress';

const style = css`
  .searchContainer {
    position: absolute;
    z-index: 10;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 8px 0 rgba(0, 0, 0, 0.1);
    margin: 32px 0 0 32px;
    padding: 16px;
    background-color: white;
  }

  .label {
    margin-bottom: 16px;
  }

  button {
    border-radius: 4px;
    height: 40px;
    box-shadow: 0 1px 2px 0 rgba(16, 162, 234, 0.3);
    background-image: linear-gradient(#10a2ea, #0f99e8);
    border: none;
    color: #ffffff;
    font-size: 16px;
    float: right;
    width: 90%;
    font-weight: bold;
    outline: none;
    cursor: pointer;
  }

  .disabled {
    opacity: 50%;
  }
`;

const SearchBox = ({ setPickUpPosition, setDropOffPosition, setToaster }) => {
  const mainState = {
    pickUpAddress: '',
    dropOffAddress: '',
    pickUpState: '',
    dropOffState: '',
    pickUpLocation: { lat: '', lng: '' },
    dropOffLocation: { lat: '', lng: '' },
  };
  const [deliveryData, setDeliveryData] = useState(mainState);
  const [isCreatingJob, setInfoButton] = useState(false);

  const {
    pickUpState,
    dropOffState,
    pickUpAddress,
    dropOffAddress,
    pickUpLocation,
    dropOffLocation,
  } = deliveryData;

  useEffect(() => {
    if (pickUpState === 'present') {
      setPickUpPosition(pickUpLocation);
    } else {
      setPickUpPosition(null);
    }
    if (dropOffState === 'present') {
      setDropOffPosition(dropOffLocation);
    } else {
      setDropOffPosition(null);
    }
  }, [pickUpState, dropOffState]);

  const handleChange = (e) => {
    e.persist();
    setDeliveryData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkAddress = async (e) => {
    e.persist();
    const pickUpOrDropOff = e.target.name;
    const address = deliveryData[pickUpOrDropOff];
    await handleAddress(address, pickUpOrDropOff, setDeliveryData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInfoButton(true);
    try {
      await createJob({
        pickUp: pickUpAddress,
        dropOff: dropOffAddress,
      });
      setInfoButton(false);
      setToaster(true);
      setDeliveryData(mainState);
    } catch {
      setInfoButton(false);
    }
  };

  const isDisabled = !(pickUpState === 'present' && dropOffState === 'present');
  return (
    <div className="searchContainer">
      <form onSubmit={handleSubmit}>
        <label htmlFor="pickUp">
          <div className="label">
            <Badge isPickUp pickUpState={pickUpState} />
            <InputField
              id="pickUp"
              placeholder="Pick up address"
              name="pickUpAddress"
              address={pickUpAddress}
              handleChange={handleChange}
              handleBlur={checkAddress}
              setDeliveryData={setDeliveryData}
            />
          </div>
        </label>
        <label htmlFor="dropOff">
          <div className="label">
            <Badge dropOffState={dropOffState} />
            <InputField
              id="dropOff"
              placeholder="Drop off address"
              name="dropOffAddress"
              address={dropOffAddress}
              handleChange={handleChange}
              handleBlur={checkAddress}
              setDeliveryData={setDeliveryData}
            />
          </div>
        </label>
        <button
          type="submit"
          disabled={isDisabled || isCreatingJob}
          className={isDisabled || isCreatingJob ? 'disabled' : ''}
        >
          {isCreatingJob ? 'Creating...' : 'Create job'}
        </button>
      </form>
      <style jsx>{style}</style>
    </div>
  );
};

export default SearchBox;
