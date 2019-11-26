import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/Button';
import { MetroSpinner } from 'react-spinners-kit';
import { Color } from 'theme';
import ErrorMessage from 'components/ErrorMessage';

const Container = styled.div``;

const DeleteConfirmationText = styled.p``;

const Buttons = styled.div`
  display: flex;
  ${props => props.theme.Media[props.theme.Device.MOBILE]} {
    flex-direction: column;
  }
  ${props => props.theme.mediaGte(props.theme.Device.TABLET)} {
    align-items: center;
  }
  ${Button} {
    flex-grow: 1;
  }
`;

const RemoveGift = ({ className, giftName, isSubmitting, onCancel, onSubmit, submitError }) => {
  const content = () => {
    if (isSubmitting) {
      return <MetroSpinner color={Color.HEART_RED} />;
    }
    return (
      <>
        <DeleteConfirmationText>Remove {giftName}?</DeleteConfirmationText>
        <Buttons>
          <Button onClick={onSubmit}>Yes</Button>
          <Button onClick={onCancel} variant="secondary">
            No
          </Button>
        </Buttons>
        {submitError && <ErrorMessage>{submitError.message}</ErrorMessage>}
      </>
    );
  };
  return <Container className={className}>{content()}</Container>;
};

RemoveGift.propTypes = {
  className: PropTypes.string,
  giftName: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitError: PropTypes.object,
};

export default RemoveGift;
