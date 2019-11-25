import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StatusText from 'components/StatusText';
import GiftContainer from 'containers/GiftContainer';
import Gift from './Gift';
import Input from 'components/Input';
import Select from 'components/Select';
import TextArea from 'components/TextArea';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledGift = styled(Gift)`
  &:nth-child(odd) {
    background-color: ${props => props.theme.Color.GALLERY};
    ${Input} {
      background-color: ${props => props.theme.Color.WHITE};
    }
    ${Select} {
      background-color: ${props => props.theme.Color.WHITE};
    }
    ${TextArea} {
      background-color: ${props => props.theme.Color.WHITE};
    }
  }
`;

const Gifts = ({ className }) => {
  const giftContainer = GiftContainer.useContainer();
  const {
    fetchGifts,
    gifts: { data, error, loading },
  } = giftContainer;

  useEffect(() => {
    fetchGifts();
  }, []);

  const content = () => {
    if (loading) {
      return <StatusText>Loading gifts...</StatusText>;
    }
    if (error) return <StatusText>Error - Unable to load gifts</StatusText>;
    if (!data) {
      return <StatusText>No gifts</StatusText>;
    }
    return data.map(gift => {
      const { description, id, name, price, rating, url } = gift;
      return <StyledGift key={id} description={description} name={name} price={price} rating={rating} url={url} />;
    });
  };

  return <Container className={className}>{content()}</Container>;
};

Gifts.propTypes = {
  className: PropTypes.string,
};

export default Gifts;
