import styled from 'styled-components';

const Select = styled.select`
  box-sizing: border-box;
  padding: 0.65rem 0.5rem;
  appearance: none;

  border: ${props => props.theme.BORDER};
  border-radius: ${props => props.theme.BORDER_RADIUS};

  font-size: 1rem;

  color: ${props => props.theme.Color.EBONY_CLAY};
  background-color: ${props => props.theme.Color.GALLERY};

  resize: vertical;
`;

export default Select;
