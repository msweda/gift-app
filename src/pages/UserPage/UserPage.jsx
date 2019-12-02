import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Page from 'components/Page';
import { NavLink } from 'react-router-dom';
import Gifts from './components/Gifts';
import ErrorMessage from 'components/ErrorMessage';

const StyledNavLink = styled(NavLink)`
  margin-bottom: ${props => props.theme.spacing(3)};
  text-decoration: underline;
  &:hover {
    color: ${props => props.theme.Color.HEART_RED};
  }
`;

const UserPage = ({
  cognitoSub,
  fetchUser,
  match: {
    params: { userId },
  },
  user,
}) => {
  const isMyOwnWishlist = cognitoSub === userId;

  useEffect(() => {
    if (!isMyOwnWishlist) {
      fetchUser(userId);
    }
  }, []);

  const heading = () => {
    if (isMyOwnWishlist) {
      return 'Cannot view your own gift page';
    }
    if (user.loading) {
      return 'Loading user...';
    }
    if (user.error) {
      return 'Error loading user';
    }
    if (!user.data) {
      return 'Unknown user';
    }
    return `${user.data.name}`;
  };

  const userContent = () => {
    if (isMyOwnWishlist) {
      return <ErrorMessage>Cannot view the status of your own wishlist</ErrorMessage>;
    }
    return <Gifts userId={userId} />;
  };

  return (
    <Page head={<title>Super Secret, Exclusive Gift App</title>} heading={heading()}>
      <StyledNavLink to="/">{`< Back to Overview`}</StyledNavLink>
      {userContent()}
    </Page>
  );
};

UserPage.propTypes = {
  cognitoSub: PropTypes.string.isRequired,
  fetchUser: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    error: PropTypes.object,
    loading: PropTypes.bool,
  }).isRequired,
};

export default UserPage;
