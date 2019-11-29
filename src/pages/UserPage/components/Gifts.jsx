import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from 'components/Card';
import Rating from 'components/Rating';

const Container = styled(Card)``;

const Gift = styled.div`
  &:nth-child(odd) {
    background-color: ${props => props.theme.Color.GALLERY};
  }
  padding: ${props => props.theme.spacing(3)};
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

const Gifts = ({ className, gifts }) => {
  console.log(gifts);
  return (
    <Container className={className}>
      {gifts.map(gift => {
        const { description, id, name, price, rating, url } = gift;
        return (
          <Gift key={id}>
            <Row>
              <Name>{name}</Name>
            </Row>
            <Row>
              <Rating value={rating} />
              <Price>${price}</Price>
            </Row>
            <Description>{description}</Description>
            <Url href={url} target="_blank">
              🔗Click For Link
            </Url>
          </Gift>
        );
      })}
    </Container>
  );
};

Gifts.propTypes = {
  className: PropTypes.string,
  gifts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ).isRequired,
};

export default Gifts;
