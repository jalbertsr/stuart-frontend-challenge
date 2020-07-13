import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import pickUpMarker from '../assets/pickUpMarker.svg';
import dropOffMarker from '../assets/dropOffMarker.svg';

const Map = ({ pickUpPosition, dropOffPosition }) => {
  const options = {
    disableDefaultUI: true,
    zoomControl: false,
  };
  return (
    <GoogleMap defaultZoom={15} defaultCenter={{ lng: 2.311473, lat: 48.862776 }} options={options}>
      <Marker position={pickUpPosition} defaultIcon={pickUpMarker} />
      <Marker position={dropOffPosition} defaultIcon={dropOffMarker} />
    </GoogleMap>
  );
};
export default withScriptjs(withGoogleMap(Map));
