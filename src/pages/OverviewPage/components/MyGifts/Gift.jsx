import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GiftForm from './GiftForm';
import Button from 'components/Button';
import IconButton from 'components/IconButton';
import Rating from 'components/Rating';

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const Url = styled.a``;

const Gift = ({ className, description, name, price, rating, url }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const content = () => {
    if (isEditing) {
      const initialValues = {
        description,
        name,
        price,
        rating,
        url,
      };
      return (
        <>
          <GiftForm className={className} initialValues={initialValues} submitButtonText="Save Changes" />{' '}
          <Button onClick={toggleIsEditing} variant="secondary">
            Discard Changes
          </Button>
        </>
      );
    }
    // const ratingText =
    return (
      <>
        <Row>
          <Name>{name}</Name>
          <IconButton onClick={toggleIsEditing}>✎</IconButton>
        </Row>
        <Row>
          <Rating value={rating} />
          <Price>${price}</Price>
        </Row>
        <Description>{description}</Description>
        <Url href={url} target="_blank">
          {url}
        </Url>
      </>
    );
  };

  return <Container className={className}>{content()}</Container>;
};

Gift.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  isEditing: PropTypes.bool,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  rating: PropTypes.number.isRequired,
  url: PropTypes.string,
};

export default Gift;
