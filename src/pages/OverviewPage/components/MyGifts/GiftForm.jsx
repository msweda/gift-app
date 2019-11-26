import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useFormik } from 'formik';
import Label from 'components/Label';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import Rating from 'components/Rating';
import { MetroSpinner } from 'react-spinners-kit';
import { Color } from 'theme';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Fields = styled.div`
  padding: ${props => props.theme.spacing(3)};
  display: flex;
  flex-direction: column;
`;

const FieldGroup = styled.div`
  display: flex;
  ${props => props.theme.Media[props.theme.Device.MOBILE]} {
    flex-direction: column;
  }
  ${props => props.theme.mediaGte(props.theme.Device.TABLET)} {
    align-items: flex-start;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.theme.spacing(1)};
`;

const FieldGroupField = styled(Field)`
  flex-grow: 1;
  ${props => props.theme.mediaGte(props.theme.Device.TABLET)} {
    &:not(:first-child) {
      margin-left: ${props => props.theme.spacing(1)};
    }
    &:not(:last-child) {
      margin-right: ${props => props.theme.spacing(1)};
    }
  }
`;

const StyledRating = styled(Rating)`
  padding-top: 0.65rem;
  padding-bottom: 0.65rem;
`;

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

const GiftForm = ({
  cancelButtonText,
  initialValues,
  isSubmitting,
  onCancel,
  onSubmit,
  submitButtonText,
  submitError,
}) => {
  const handleCancel = e => {
    e.preventDefault();
    e.stopPropagation();
    onCancel();
  };
  const formik = useFormik({
    initialValues: {
      rating: 3,
      ...initialValues,
    },
    onSubmit: values => {
      onSubmit(values);
    },
    validate: values => {
      const errors = {};
      if (!values.name || values.name === '') {
        errors.name = 'Required';
      } else if (values.name.length < 3) {
        errors.firstName = 'Must be 3 characters or more';
      }
      return errors;
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Fields>
        <Field>
          <Label htmlFor="gift-form-name">Name *</Label>
          <Input id="gift-form-name" name="name" onChange={formik.handleChange} value={formik.values.name} />
          {formik.errors.name && <ErrorMessage>{formik.errors.name}</ErrorMessage>}
        </Field>
        <FieldGroup>
          <FieldGroupField>
            <Label htmlFor="gift-form-rating">Rating</Label>
            <StyledRating
              id="gift-form-rating"
              isEditable={true}
              onChange={value => formik.setFieldValue('rating', value)}
              value={formik.values.rating}
            />
          </FieldGroupField>
          <FieldGroupField>
            <Label htmlFor="gift-form-price">Price ($)</Label>
            <Input
              id="gift-form-price"
              name="price"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
          </FieldGroupField>
        </FieldGroup>

        <Field>
          <Label htmlFor="gift-form-description">Description</Label>
          <TextArea
            id="gift-form-description"
            name="description"
            type="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </Field>

        <Field>
          <Label htmlFor="gift-form-url">Url</Label>
          <TextArea id="gift-form-url" name="url" type="url" onChange={formik.handleChange} value={formik.values.url} />
        </Field>
      </Fields>

      {isSubmitting ? (
        <MetroSpinner color={Color.HEART_RED} />
      ) : (
        <>
          {submitError && <ErrorMessage>{submitError.message}</ErrorMessage>}
          <Buttons>
            <Button type="submit">{submitButtonText}</Button>
            <Button onClick={handleCancel} variant="secondary">
              {cancelButtonText}
            </Button>
          </Buttons>
        </>
      )}
    </Form>
  );
};

GiftForm.propTypes = {
  cancelButtonText: PropTypes.string,
  initialValues: PropTypes.object,
  isSubmitting: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string,
  submitError: PropTypes.object,
};

GiftForm.defaultProps = {
  cancelButtonText: 'Cancel',
  submitButtonText: 'Submit',
};

export default GiftForm;
