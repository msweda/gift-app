import React from 'react';
import AuthContainer from 'containers/AuthContainer';
import GiftsContainer from '../../containers/GiftsContainer';
import { default as Component } from './GiftClaim';

const GiftClaim = props => {
  const authContainer = AuthContainer.useContainer();
  const { cognitoSub } = authContainer;
  const giftsContainer = GiftsContainer.useContainer();
  const { claimedGift, claimGift, unclaimedGift, unclaimGift } = giftsContainer;
  return (
    <Component
      {...props}
      claimedGift={claimedGift}
      claimGift={claimGift}
      cognitoSub={cognitoSub}
      unclaimedGift={unclaimedGift}
      unclaimGift={unclaimGift}
    />
  );
};

export default GiftClaim;
