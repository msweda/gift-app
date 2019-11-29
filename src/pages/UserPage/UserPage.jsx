import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Page from 'components/Page';
import AuthContainer from 'containers/AuthContainer';
import UsersContainer from 'containers/UsersContainer';
import StatusText from 'components/StatusText';
import ErrorMessage from 'components/ErrorMessage';
import { NavLink } from 'react-router-dom';
import Gifts from './components/Gifts';

const StyledNavLink = styled(NavLink)`
  margin-bottom: ${props => props.theme.spacing(3)};
  text-decoration: underline;
  &:hover {
    color: ${props => props.theme.Color.HEART_RED};
  }
`;

const UserPage = ({
  match: {
    params: { userId },
  },
}) => {
  const authContainer = AuthContainer.useContainer();
  const { cognitoSub } = authContainer;
  const usersContainer = UsersContainer.useContainer();
  const { fetchOtherUser, otherUser } = usersContainer;

  useEffect(() => {
    fetchOtherUser(userId);
  }, []);

  const heading = () => {
    if (cognitoSub === userId) {
      return 'Cannot View Your Own Wishlist';
    }
    if (otherUser.loading) {
      return 'Loading...';
    }
    if (otherUser.error) {
      return 'Gift App User';
    }
    if (!otherUser.data) {
      return 'Gift App User';
    }
    return `${otherUser.data.name}'s Wishlist`;
  };

  const content = () => {
    if (cognitoSub === userId) {
      return <ErrorMessage>You cannot view the status of your own wishlist</ErrorMessage>;
    }
    if (otherUser.loading) {
      return null;
    }
    if (otherUser.error) {
      return <ErrorMessage>Error - Could not load user</ErrorMessage>;
    }
    if (!otherUser.data) {
      return <StatusText>No user data loaded</StatusText>;
    }
    return <Gifts gifts={otherUser.data.gifts.items} />;
  };

  return (
    <Page head={<title>Super Secret, Exclusive Gift App</title>} heading={heading()}>
      <StyledNavLink to="/">{`< Back to Overview`}</StyledNavLink>
      {content()}
    </Page>
  );
};

UserPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UserPage;
