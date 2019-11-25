import React from 'react';
import PropTypes from 'prop-types';
import AuthContainer from 'containers/AuthContainer';
import UsersContainer from 'containers/UsersContainer';
import GiftContainer from 'containers/GiftContainer';

const ContentGuard = ({ authData, authState, children }) => {
  if (authState !== 'signedIn') {
    return null;
  }
  return (
    <AuthContainer.Provider
      initialState={{
        cognitoSub: authData.attributes.sub,
      }}
    >
      <UsersContainer.Provider>
        <GiftContainer.Provider>{children}</GiftContainer.Provider>
      </UsersContainer.Provider>
    </AuthContainer.Provider>
  );
};

ContentGuard.propTypes = {
  authData: PropTypes.shape({
    attributes: PropTypes.shape({
      sub: PropTypes.string.isRequired,
    }),
  }),
  authState: PropTypes.string,
  children: PropTypes.node,
};

export default ContentGuard;
