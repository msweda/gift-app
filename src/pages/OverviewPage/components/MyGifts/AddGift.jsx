import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/Button';
import GiftForm from './GiftForm';
import GiftContainer from 'containers/GiftContainer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing(3)};
`;

const StyledButton = styled(Button)``;

const AddingHeading = styled.h3`
  padding: ${props => props.theme.spacing(2)};
`;

const AddGift = ({ className }) => {
  const [isAdding, setIsAdding] = useState(false);
  const toggleIsAdding = () => {
    setIsAdding(!isAdding);
  };

  const giftContainer = GiftContainer.useContainer();
  const {
    addedGift: { error, loading },
    addGift,
  } = giftContainer;

  const handleSubmitGiftForm = async values => {
    await addGift(values);
    toggleIsAdding();
  };

  const content = () => {
    if (!isAdding) {
      return <StyledButton onClick={toggleIsAdding}>Add New Gift</StyledButton>;
    }
    return (
      <>
        <AddingHeading>Describe Your New Gift:</AddingHeading>
        <GiftForm
          cancelButtonText="Discard New Gift"
          isSubmitting={loading}
          onCancel={toggleIsAdding}
          onSubmit={handleSubmitGiftForm}
          submitButtonText="Add New Gift"
          submitError={error}
        />
      </>
    );
  };

  return <Container className={className}>{content()}</Container>;
};

AddGift.propTypes = {
  className: PropTypes.string,
};

export default AddGift;
