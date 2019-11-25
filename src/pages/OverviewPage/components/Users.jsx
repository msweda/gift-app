import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Card from 'components/Card';
import UsersContainer from 'containers/UsersContainer';

const Container = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: ${props => props.theme.BORDER};
  padding: ${props => props.theme.spacing(2)};
  ${props => props.theme.Media[props.theme.Device.MOBILE]} {
    align-items: center;
  }
`;

const Heading = styled.h2`
  color: ${props => props.theme.Color.EBONY_CLAY};
`;

const Subheading = styled.p`
  padding: ${props => props.theme.spacing(1)};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatusText = styled.p`
  padding: ${props => props.theme.spacing(1)};
`;

const StyledNavLink = styled(NavLink)`
  cursor: pointer;
  padding: ${props => props.theme.spacing(1)};
  &:nth-child(odd) {
    background-color: ${props => props.theme.Color.GALLERY};
  }
  &:hover {
    background-color: ${props => props.theme.Color.KOROMIKO};
  }
`;

const Users = ({ className }) => {
  const usersContainer = UsersContainer.useContainer();
  const {
    fetchUsers,
    users: { data, error, loading },
  } = usersContainer;

  useEffect(() => {
    fetchUsers();
  }, []);

  const bodyContent = () => {
    if (loading) return <StatusText>Loading...</StatusText>;
    if (error) return <StatusText>Error - Unable to Load Users</StatusText>;
    if (!data) {
      return <StatusText>No users</StatusText>;
    }
    return data.map(user => {
      const { id, name } = user;
      return (
        <StyledNavLink key={id} to={`/users/${id}`}>
          {name}
        </StyledNavLink>
      );
    });
  };

  return (
    <Container className={className}>
      <Header>
        <Heading>Family</Heading>
        <Subheading>Click to view wishlist</Subheading>
      </Header>
      <Body>{bodyContent()}</Body>
    </Container>
  );
};

Users.propTypes = {
  className: PropTypes.string,
};

export default Users;
