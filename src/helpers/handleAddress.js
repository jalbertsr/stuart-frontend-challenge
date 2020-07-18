import { checkGeocodeAddress } from '../services';

const handleAddress = async (address = '', pickUpOrDropOff, setDeliveryData) => {
  let addressState = 'blank';
  if (address.length) {
    try {
      const { latitude, longitude } = await checkGeocodeAddress(address);
      setDeliveryData((prevState) => ({
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

    setDeliveryData((prevState) => ({ ...prevState, ...state }));
  }
};

export default handleAddress;
