import styled from 'styled-components';

const Card = styled.div`
  border: ${props => props.theme.BORDER};
  border-radius: ${props => props.theme.BORDER_RADIUS};
  overflow: hidden;
`;

export default Card;
