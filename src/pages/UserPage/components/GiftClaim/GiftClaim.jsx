import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/Button';
import StatusText from 'components/StatusText';
import { MetroSpinner } from 'react-spinners-kit';
import ErrorMessage from 'components/ErrorMessage';
import { Color } from 'theme';

const Container = styled.div``;

const GiftClaim = ({
  claimedGift,
  claimGift,
  claimUser,
  className,
  cognitoSub,
  giftId,
  unclaimedGift,
  unclaimGift,
}) => {
  const handleClaimGift = () => {
    claimGift(giftId);
  };
  const handleUnclaimGift = () => {
    unclaimGift(giftId);
  };
  const content = () => {
    if (!claimUser) {
      if (claimedGift.loading) {
        return <MetroSpinner color={Color.HEART_RED} />;
      }
      return (
        <>
          <Button onClick={handleClaimGift}>Claim this gift</Button>
          {claimedGift.error && <ErrorMessage>{claimedGift.error.message}</ErrorMessage>}
        </>
      );
    }
    if (claimUser.id === cognitoSub) {
      if (unclaimedGift.loading) {
        return <MetroSpinner color={Color.HEART_RED} />;
      }
      return (
        <>
          <StatusText>You have claimed this gift</StatusText>
          <Button onClick={handleUnclaimGift} variant="secondary">
            Unclaim
          </Button>
          {unclaimedGift.error && <ErrorMessage>{unclaimedGift.error.message}</ErrorMessage>}
        </>
      );
    }
    return <StatusText>{`Claimed by ${claimUser.name}`}</StatusText>;
  };
  return <Container className={className}>{content()}</Container>;
};

GiftClaim.propTypes = {
  claimedGift: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
  claimGift: PropTypes.func.isRequired,
  claimUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
  cognitoSub: PropTypes.string.isRequired,
  giftId: PropTypes.string.isRequired,
  unclaimedGift: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
  unclaimGift: PropTypes.func.isRequired,
};

export default GiftClaim;
