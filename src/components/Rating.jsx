import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import starIconSrc from 'icons/star-24px.svg';
import starBorderIconSrc from 'icons/star_border-24px.svg';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  cursor: ${props => (props.isEditable ? 'pointer' : 'auto')};
  color: red;
`;

const Rating = ({ className, id, isEditable, max, onChange, value }) => {
  const handleClick = index => e => {
    if (onChange && isEditable) {
      // Indicies range from 0 to N and we want ratings to range from 1 to (N+1).
      onChange(index + 1);
    }
  };
  return (
    <Container className={className} id={id}>
      {[...Array(max)].map((_, index) => {
        const src = index < value ? starIconSrc : starBorderIconSrc;
        return <Icon key={index} src={src} onClick={handleClick(index)} isEditable={isEditable} />;
      })}
    </Container>
  );
};

Rating.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  isEditable: PropTypes.bool,
  max: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.number.isRequired,
};

Rating.defaultProps = {
  max: 5,
};

export default Rating;
