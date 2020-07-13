import { checkGeocodeAddress } from '../services';

const handleAddress = async (address = '', pickUpOrDropOff, useDeliveryData) => {
  let addressState = 'blank';
  if (address.length) {
    try {
      const { latitude, longitude } = await checkGeocodeAddress(address);
      useDeliveryData((prevState) => ({
        ...prevState,
        [pickUpOrDropOff === 'pickUpAddress' ? 'pickUpLocation' : 'dropOffLocation']: {
          lat: latitude,
          lng: longitude,
        },
      }));
      addressState = 'present';
    } catch {
      addressState = 'error';
    }
    const state =
      pickUpOrDropOff === 'pickUpAddress'
        ? { pickUpState: addressState }
        : { dropOffState: addressState };

    useDeliveryData((prevState) => ({ ...prevState, ...state }));
  }
};

export default handleAddress;
