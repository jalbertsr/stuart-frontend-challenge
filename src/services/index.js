import axios from 'axios';

const BASE_URL = 'https://stuart-frontend-challenge.now.sh';

export const createJob = ({ pickUp, dropOff }) => {
  const config = {
    url: `${BASE_URL}/jobs`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ pickup: pickUp, dropoff: dropOff }),
  };
  return axios(config).then(({ data }) => data);
};

export const checkGeocodeAddress = (address) => {
  const config = {
    url: `${BASE_URL}/geocode`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ address }),
  };
  return axios(config).then(({ data }) => data);
};
