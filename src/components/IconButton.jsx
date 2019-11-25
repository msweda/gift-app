import styled from 'styled-components';

const IconButton = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  cursor: pointer;

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

export default IconButton;
