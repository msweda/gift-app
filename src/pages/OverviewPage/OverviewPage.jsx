import React from 'react';
import styled from 'styled-components';
import Page from 'components/Page';
import Users from './components/Users';
import MyGifts from './components/MyGifts/MyGifts';

const Content = styled.div`
  display: flex;
  ${props => props.theme.Media[props.theme.Device.MOBILE]} {
    flex-direction: column-reverse;
  }
  ${props => props.theme.mediaGte(props.theme.Device.TABLET)} {
    align-items: flex-start;
  }
`;

const StyledUsers = styled(Users)`
  ${props => props.theme.Media[props.theme.Device.MOBILE]} {
    width: 100%;
  }
  ${props => props.theme.mediaGte(props.theme.Device.TABLET)} {
    width: 30%;
  }
`;

const StyledMyGifts = styled(MyGifts)`
  ${props => props.theme.Media[props.theme.Device.MOBILE]} {
    width: 100%;
    margin-bottom: ${props => props.theme.spacing(3)};
  }
  ${props => props.theme.mediaGte(props.theme.Device.TABLET)} {
    width: calc(70% - ${props => props.theme.spacing(3)});
    margin-left: ${props => props.theme.spacing(3)};
  }
`;

const OverviewPage = () => {
  return (
    <Page head={<title>Gifting Made Easy - Family Gift App</title>} heading="Gifting Made Easy">
      <Content>
        <StyledUsers />
        <StyledMyGifts />
      </Content>
    </Page>
  );
};

export default OverviewPage;
