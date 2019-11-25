import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from 'components/Card';
import AddGift from './AddGift';
import Gifts from './Gifts';

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: ${props => props.theme.BORDER};
  padding: ${props => props.theme.spacing(2)};
  ${props => props.theme.Media[props.theme.Device.MOBILE]} {
    align-items: center;
  }
`;

const Heading = styled.h2`
  color: ${props => props.theme.Color.EBONY_CLAY};
`;

const Subheading = styled.p`
  padding: ${props => props.theme.spacing(1)};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledGifts = styled(Gifts)`
  border-bottom: ${props => props.theme.BORDER};
`;

const MyGifts = ({ className }) => {
  return (
    <Container className={className}>
      <Header>
        <Heading>My Wishlist</Heading>
        <Subheading>Add, edit and delete your gifts</Subheading>
      </Header>
      <Body>
        <StyledGifts />
        <AddGift />
      </Body>
    </Container>
  );
};

MyGifts.propTypes = {
  className: PropTypes.string,
};

export default MyGifts;
