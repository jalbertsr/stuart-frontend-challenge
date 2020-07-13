import React, { useState } from 'react';
import css from 'styled-jsx/css';

import Badge from './Badge';
import { checkGeocodeAddress, createJob } from '../services';

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

const SearchBox = ({ usePickUpPosition, useDropOffPosition, useToaster }) => {
  const mainState = {
    pickUpAddress: '',
    dropOffAddress: '',
    pickUpState: '',
    dropOffState: '',
    pickUpLocation: { lat: '', lng: '' },
    dropOffLocation: { lat: '', lng: '' },
  };
  const [infoButton, useInfoButton] = useState({
    isCreatingJob: false,
    isDisabled: true,
  });
  const [deliveryData, useDeliveryData] = useState(mainState);
  const { pickUpAddress, dropOffAddress } = deliveryData;

  // bonus step
  // useEffect(() => {
  //   const timeoutId = setTimeout(async () => {
  //     const { latitude, longitude } = await checkGeocodeAddress();
  //     useDeliveryData((prevState) => ({
  //       ...prevState,
  //       [pickUpOrDropOff === 'pickUpAddress'
  //         ? 'pickUpLocation'
  //         : 'dropOffLocation']: { lat: latitude, lng: longitude },
  //     }));
  //   }, 2000);
  //   return () => clearTimeout(timeoutId);
  // }, [pickUpAddress, dropOffAddress]);

  const handleChange = (e) => {
    e.persist();
    useDeliveryData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkAddress = async (e) => {
    e.persist();
    const pickUpOrDropOff = e.target.name;
    const address = deliveryData[pickUpOrDropOff];
    let addressState = 'blank';
    if (address.length) {
      try {
        const { latitude, longitude } = await checkGeocodeAddress(address);
        useDeliveryData((prevState) => ({
          ...prevState,
          [pickUpOrDropOff === 'pickUpAddress'
            ? 'pickUpLocation'
            : 'dropOffLocation']: { lat: latitude, lng: longitude },
        }));
        addressState = 'present';
      } catch {
        addressState = 'error';
      }
    }
    const state = e.target.name === 'pickUpAddress'
      ? { pickUpState: addressState }
      : { dropOffState: addressState };

    useDeliveryData((prevState) => ({ ...prevState, ...state }));

    const { pickUpState, dropOffState } = deliveryData;
    useInfoButton((prevState) => ({
      ...prevState,
      isDisabled: !(pickUpState === 'present' || dropOffState === 'present'),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    useInfoButton((prevState) => ({ ...prevState, isCreatingJob: true }));
    try {
      await createJob({
        pickUp: pickUpAddress,
        dropOff: dropOffAddress,
      });
      useInfoButton((prevState) => ({ ...prevState, isCreatingJob: false }));
      useToaster(true);
      useDeliveryData(mainState);
    } catch {
      useInfoButton((prevState) => ({ ...prevState, isCreatingJob: false }));
    }
  };

  const {
    pickUpState,
    dropOffState,
    pickUpLocation,
    dropOffLocation,
  } = deliveryData;

  if (pickUpState === 'present') {
    usePickUpPosition(pickUpLocation);
  } else {
    usePickUpPosition(null);
  }
  if (dropOffState === 'present') {
    useDropOffPosition(dropOffLocation);
  } else {
    useDropOffPosition(null);
  }

  const { isDisabled, isCreatingJob } = infoButton;
  return (
    <div className="searchContainer">
      <form onSubmit={handleSubmit}>
        <label htmlFor="pickUp">
          <div className="label">
            <Badge isPickUp pickUpState={pickUpState} />
            <input
              id="pickUp"
              placeholder="Pick up address"
              type="text"
              name="pickUpAddress"
              value={pickUpAddress}
              onChange={handleChange}
              onBlur={checkAddress}
            />
          </div>
        </label>
        <label htmlFor="dropOff">
          <div className="label">
            <Badge dropOffState={dropOffState} />
            <input
              id="dropOff"
              placeholder="Drop off address"
              type="text"
              name="dropOffAddress"
              value={dropOffAddress}
              onChange={handleChange}
              onBlur={checkAddress}
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
