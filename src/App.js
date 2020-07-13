import React, { useState } from 'react';
import css from 'styled-jsx/css';

import Map from './components/Map';
import Toaster from './components/Toaster';
import SearchBox from './components/SearchBox';

const globalStyle = css.global`
  * {
    font-family: 'Roboto';
  }
  body {
    margin: 0;
  }
`;

const style = css`
  div.container {
    width: 100vw;
    height: 100vh;
  }
`;

const App = () => {
  const [pickUpPosition, usePickUpPosition] = useState();
  const [dropOffPosition, useDropOffPosition] = useState();
  const [isJobToaster, useToaster] = useState(false);

  return (
    <div className="container">
      {isJobToaster && <Toaster useToaster={useToaster} />}
      <SearchBox
        useToaster={useToaster}
        usePickUpPosition={usePickUpPosition}
        useDropOffPosition={useDropOffPosition}
      />
      <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.GOOGLE_MAPS_API_KEY}`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        pickUpPosition={pickUpPosition}
        dropOffPosition={dropOffPosition}
      />
      <style jsx>{style}</style>
      <style jsx global>
        {globalStyle}
      </style>
    </div>
  );
};

export default App;
