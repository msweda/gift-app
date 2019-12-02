import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from 'components/Card';
import Rating from 'components/Rating';
import StatusText from 'components/StatusText';
import ErrorMessage from 'components/ErrorMessage';
import GiftClaim from '../GiftClaim';

const Container = styled(Card)``;

const Gift = styled.div`
  display: flex;
  ${props => props.theme.Media[props.theme.Device.MOBILE]} {
    flex-direction: column;
    align-items: center;
  }
  ${props => props.theme.mediaGte(props.theme.Device.TABLET)} {
    justify-content: space-between;
  }
  &:nth-child(odd) {
    background-color: ${props => props.theme.Color.GALLERY};
  }
  padding: ${props => props.theme.spacing(3)};
`;

const Details = styled.div`
  ${props => props.theme.Media[props.theme.Device.MOBILE]} {
    margin-bottom: ${props => props.theme.spacing(1)};
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: ${props => props.theme.spacing(2)};
  }
`;

const Name = styled.p``;

const Price = styled.p``;

const Description = styled.p``;

const Url = styled.a`
  word-break: break-word;
  text-decoration: underline;
  &:hover {
    color: ${props => props.theme.Color.HEART_RED};
  }
`;

const Gifts = ({ className, fetchGifts, gifts, userId }) => {
  useEffect(() => {
    fetchGifts(userId);
  }, []);

  const content = () => {
    if (gifts.loading) {
      return <StatusText>Loading gifts...</StatusText>;
    }
    if (gifts.error) {
      return <ErrorMessage>Unable to load gifts</ErrorMessage>;
    }
    if (!gifts.data) {
      return <StatusText>No gifts</StatusText>;
    }
    return gifts.data.map(gift => {
      const { claimUser, description, id, name, price, rating, url } = gift;
      return (
        <Gift key={id}>
          <Details>
            <Name>{name}</Name>
            {(rating || price) && (
              <Row>
                {rating && <Rating value={rating} />}
                {price && <Price>${price}</Price>}
              </Row>
            )}
            {description && <Description>{description}</Description>}
            {url && (
              <Url href={url} target="_blank">
                🔗Click For Link
              </Url>
            )}
          </Details>
          <GiftClaim claimUser={claimUser} giftId={id} />
        </Gift>
      );
    });
  };
  return <Container className={className}>{content()}</Container>;
};

Gifts.propTypes = {
  className: PropTypes.string,
  fetchGifts: PropTypes.func.isRequired,
  gifts: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        claimUser: PropTypes.object,
        description: PropTypes.string,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number,
        rating: PropTypes.number,
        url: PropTypes.string,
      }),
    ),
    error: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

export default Gifts;
