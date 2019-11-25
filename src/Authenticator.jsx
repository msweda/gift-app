import React from 'react';
import PropTypes from 'prop-types';
import {
  Authenticator as AWSAmplifyReactAuthenticator,
  SignIn,
  RequireNewPassword,
  ForgotPassword,
  Loading,
} from 'aws-amplify-react';

const Authenticator = ({ children }) => {
  return (
    <AWSAmplifyReactAuthenticator authState="signIn" hideDefault={true}>
      <SignIn />
      <RequireNewPassword />
      <ForgotPassword />
      <Loading />
      {children}
    </AWSAmplifyReactAuthenticator>
  );
};

Authenticator.propTypes = {
  children: PropTypes.node,
};

export default Authenticator;
