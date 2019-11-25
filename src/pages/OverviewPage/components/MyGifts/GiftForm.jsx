import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useFormik } from 'formik';
import Label from 'components/Label';
import Input from 'components/Input';
import TextArea from 'components/TextArea';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import Select from 'components/Select';
import Rating from 'components/Rating';

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

const GiftForm = ({ initialValues, onSubmit, submitButtonText }) => {
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
            <Rating
              id="gift-form-rating"
              isEditable={true}
              onChange={value => formik.setFieldValue('rating', value)}
              value={formik.values.rating}
            />
            {/* <Select id="gift-form-rating" name="rating" onChange={formik.handleChange} value={formik.values.rating}>
              <option value={1}>{`1 - Here's an idea`}</option>
              <option value={2}>{`2 - I could use this`}</option>
              <option value={3}>{`3 - I would like this`}</option>
              <option value={4}>{`4 - I would love this`}</option>
              <option value={5}>{`5 - I gotta have this`}</option>
            </Select> */}
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

      <Button type="submit">{submitButtonText}</Button>
    </Form>
  );
};

GiftForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string,
};

GiftForm.defaultProps = {
  submitButtonText: 'Submit',
};

export default GiftForm;
