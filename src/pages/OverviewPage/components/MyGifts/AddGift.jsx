import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/Button';
import GiftForm from './GiftForm';
import GiftContainer from 'containers/GiftContainer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)``;

const StatusText = styled.p`
  padding: ${props => props.theme.spacing(1)};
`;

const AddingHeading = styled.p`
  padding: ${props => props.theme.spacing(1)};
`;

const AddGift = ({ className }) => {
  const [isAdding, setIsAdding] = useState(false);
  const toggleIsAdding = () => {
    setIsAdding(!isAdding);
  };

  const giftContainer = GiftContainer.useContainer();
  const {
    addedGift: { data, error, loading },
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
    if (loading) {
      return <StatusText>Loading...</StatusText>;
    }
    if (error) return <StatusText>Error - Unable to add gift</StatusText>;
    return (
      <>
        <AddingHeading>Describe Your New Gift:</AddingHeading>
        <GiftForm onSubmit={handleSubmitGiftForm} submitButtonText="Add New Gift" />
        <Button variant="secondary" onClick={toggleIsAdding}>
          Discard New Gift
        </Button>
      </>
    );
  };

  return <Container className={className}>{content()}</Container>;
};

AddGift.propTypes = {
  className: PropTypes.string,
};

export default AddGift;
