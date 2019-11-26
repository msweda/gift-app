import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GiftForm from './GiftForm';
import IconButton from 'components/IconButton';
import Rating from 'components/Rating';
import RemoveGift from './RemoveGift';
import GiftContainer from 'containers/GiftContainer';

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

const Url = styled.a`
  word-break: break-word;
`;

const Gift = ({ className, description, giftId, name, price, rating, url }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const toggleIsDeleting = () => {
    setIsDeleting(!isDeleting);
  };

  const giftContainer = GiftContainer.useContainer();
  const { editedGift, editGift, removedGift, removeGift } = giftContainer;

  const handleEditGift = async values => {
    await editGift({ ...values, id: giftId });
    toggleIsEditing();
  };

  const handleRemoveGift = async () => {
    await removeGift({ id: giftId });
    toggleIsDeleting();
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
        <GiftForm
          cancelButtonText="Discard Changes"
          className={className}
          initialValues={initialValues}
          isSubmitting={editedGift.loading}
          onCancel={toggleIsEditing}
          onSubmit={handleEditGift}
          submitButtonText="Save Changes"
          submitError={editedGift.error}
        />
      );
    }
    if (isDeleting) {
      return (
        <RemoveGift
          giftName={name}
          isSubmitting={removedGift.loading}
          onCancel={toggleIsDeleting}
          onSubmit={handleRemoveGift}
          submitError={removedGift.error}
        />
      );
    }
    return (
      <>
        <Row>
          <Name>{name}</Name>
          <IconButton onClick={toggleIsEditing}>✎</IconButton>
          <IconButton onClick={toggleIsDeleting} variant="secondary">
            ✕
          </IconButton>
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
  giftId: PropTypes.string.isRequired,
  isEditing: PropTypes.bool,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  rating: PropTypes.number.isRequired,
  url: PropTypes.string,
};

export default Gift;
