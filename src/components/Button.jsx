import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 153px;
  padding: 14px 0;
  border: none;

  font-size: 12px;
  font-weight: 400;
  line-height: 1.42857143;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  white-space: nowrap;

  color: ${props => {
    switch (props.variant) {
      case 'secondary':
      case 'primary':
      default:
        return props.theme.Color.WHITE;
    }
  }};
  background-color: ${props => {
    switch (props.variant) {
      case 'secondary':
        return props.theme.Color.EBONY_CLAY;
      case 'primary':
      default:
        return props.theme.Color.ORANGE_PEEL;
    }
  }};

  touch-action: manipulation;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${props => {
      switch (props.variant) {
        case 'secondary':
          return props.theme.Color.PICKLED_BLUEWOOD;
        case 'primary':
        default:
          return props.theme.Color.KOROMIKO;
      }
    }};
  }
`;

Button.propTypes = {
  variant: PropTypes.string,
};

export default Button;
