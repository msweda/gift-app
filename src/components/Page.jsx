import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SignOut } from 'aws-amplify-react';
import { Helmet } from 'react-helmet-async';

const FlexWrapper = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const Header = styled.div`
  padding: ${props => props.theme.spacing(3)};
  display: flex;
  flex-wrap: wrap;
  border-bottom: ${props => props.theme.BORDER};
  ${props => props.theme.Media[props.theme.Device.MOBILE]} {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Heading = styled.h1`
  color: ${props => props.theme.Color.EBONY_CLAY};
  ${props => props.theme.Media[props.theme.Device.MOBILE]} {
    margin-bottom: ${props => props.theme.spacing(1)};
  }
  ${props => props.theme.mediaGte(props.theme.Device.TABLET)} {
    margin-right: auto;
  }
`;

const NonMobileSignOutWrapper = styled.span`
  ${props => props.theme.Media[props.theme.Device.MOBILE]} {
    display: none;
  }
`;

const PageContent = styled.div`
  flex-grow: 1;
  padding: ${props => props.theme.spacing(3)};
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MobileSignOutWrapper = styled.span`
  ${props => props.theme.Media[props.theme.Device.MOBILE]} {
    display: flex;
    flex-direction: column;
  }
  ${props => props.theme.mediaGte(props.theme.Device.TABLET)} {
    display: none;
  }
`;

const Page = ({ children, className, head, heading }) => {
  return (
    <FlexWrapper>
      <Container className={className}>
        <Helmet>{head}</Helmet>
        <Header>
          <Heading>{heading}</Heading>
          <NonMobileSignOutWrapper>
            <SignOut />
          </NonMobileSignOutWrapper>
        </Header>
        <PageContent>{children}</PageContent>
        <MobileSignOutWrapper>
          <SignOut />
        </MobileSignOutWrapper>
      </Container>
    </FlexWrapper>
  );
};

Page.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  head: PropTypes.node,
  heading: PropTypes.string.isRequired,
};

export default Page;
