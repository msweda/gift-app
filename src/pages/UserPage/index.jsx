import React from 'react';
import AuthContainer from 'containers/AuthContainer';
import UsersContainer from 'containers/UsersContainer';
import { default as Component } from './UserPage';

const UserPage = props => {
  const authContainer = AuthContainer.useContainer();
  const { cognitoSub } = authContainer;
  const usersContainer = UsersContainer.useContainer();
  const { fetchOtherUser, otherUser } = usersContainer;
  return <Component {...props} cognitoSub={cognitoSub} fetchUser={fetchOtherUser} user={otherUser} />;
};

export default UserPage;
