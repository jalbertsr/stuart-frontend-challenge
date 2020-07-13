import React from 'react';
import css from 'styled-jsx/css';

import pickUpBlank from '../assets/pickUpBadgeBlank.svg';
import pickUpError from '../assets/pickUpBadgeError.svg';
import pickUpPresent from '../assets/pickUpBadgePresent.svg';
import dropOffBlank from '../assets/dropOffBadgeBlank.svg';
import dropOffError from '../assets/dropOffBadgeError.svg';
import dropOffPresent from '../assets/dropOffBadgePresent.svg';

const style = css`
  .labelBadge {
    margin-right: 8px;
    vertical-align: middle;
  }
`;

const Badge = ({ isPickUp, pickUpState, dropOffState }) => {
  const badgeSelector = () => {
    if (isPickUp) {
      switch (pickUpState) {
        case 'error':
          return <img src={pickUpError} alt="pickUpErrorBadge" />;
        case 'present':
          return <img src={pickUpPresent} alt="pickUpPresentBadge" />;
        default:
          return <img src={pickUpBlank} alt="pickUpBadge" />;
      }
    } else {
      switch (dropOffState) {
        case 'error':
          return <img src={dropOffError} alt="dropOffErrorBadge" />;
        case 'present':
          return <img src={dropOffPresent} alt="dropOffPresentBadge" />;
        default:
          return <img src={dropOffBlank} alt="dropOffBadge" />;
      }
    }
  };
  return (
    <span className="labelBadge">
      {badgeSelector()}
      <style jsx>{style}</style>
    </span>
  );
};

export default Badge;
