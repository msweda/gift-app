import { API, graphqlOperation } from 'aws-amplify';
import { getUser, listUsers } from 'graphql/queries';
import { useReducer } from 'react';
import { createContainer } from 'unstated-next';
import AuthContainer from './AuthContainer';

const defaultState = {
  myUser: {
    data: undefined,
    error: undefined,
    loading: false,
  },
  users: {
    data: undefined,
    error: undefined,
    loading: false,
  },
};

const MyUserReducerType = {
  FETCH_MY_USER_REQUEST: 'FETCH_MY_USER_REQUEST',
  FETCH_MY_USER_SUCCESS: 'FETCH_MY_USER_SUCCESS',
  FETCH_MY_USER_FAILURE: 'FETCH_MY_USER_FAILURE',
};

const myUserReducer = (state, action) => {
  switch (action.type) {
    case MyUserReducerType.FETCH_MY_USER_REQUEST:
      return {
        ...state,
        error: defaultState.myUser.error,
        loading: true,
      };
    case MyUserReducerType.FETCH_MY_USER_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case MyUserReducerType.FETCH_MY_USER_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      throw new Error('UsersContainer - myUserReducer received unknown action');
  }
};

const UsersReducerType = {
  FETCH_USERS_REQUEST: 'FETCH_USERS_REQUEST',
  FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
  FETCH_USERS_FAILURE: 'FETCH_USERS_FAILURE',
};

const usersReducer = (state, action) => {
  switch (action.type) {
    case UsersReducerType.FETCH_USERS_REQUEST:
      return {
        ...state,
        error: defaultState.users.error,
        loading: true,
      };
    case UsersReducerType.FETCH_USERS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case UsersReducerType.FETCH_USERS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      throw new Error('UsersContainer - usersReducer received unknown action');
  }
};

const useUsersContainer = (initialState = defaultState) => {
  const authContainer = AuthContainer.useContainer();
  const { cognitoSub } = authContainer;

  const [myUser, myUserDispatch] = useReducer(myUserReducer, initialState.myUser);
  const fetchMyUser = async (config = {}) => {
    const { refreshData } = config;
    if (myUser.data && !myUser.loading && !refreshData) {
      return;
    }
    myUserDispatch({
      type: MyUserReducerType.FETCH_MY_USER_REQUEST,
    });
    try {
      const response = await API.graphql(
        graphqlOperation(getUser, {
          id: cognitoSub,
        }),
      );
      myUserDispatch({
        type: MyUserReducerType.FETCH_MY_USER_SUCCESS,
        data: response.data.getUser,
      });
    } catch (e) {
      myUserDispatch({
        type: MyUserReducerType.FETCH_MY_USER_FAILURE,
        error: e,
      });
    }
  };

  const [users, usersDispatch] = useReducer(usersReducer, initialState.users);
  const fetchUsers = async (config = {}) => {
    const { refreshData } = config;
    if (users.data && !users.loading && !refreshData) {
      return;
    }
    usersDispatch({
      type: UsersReducerType.FETCH_USERS_REQUEST,
    });
    try {
      const response = await API.graphql(
        graphqlOperation(listUsers, {
          filter: {
            id: {
              ne: cognitoSub,
            },
          },
        }),
      );
      usersDispatch({
        type: UsersReducerType.FETCH_USERS_SUCCESS,
        data: response.data.listUsers.items,
      });
    } catch (e) {
      usersDispatch({
        type: UsersReducerType.FETCH_USERS_FAILURE,
        error: e,
      });
    }
  };

  return { fetchMyUser, fetchUsers, myUser, users };
};

const UsersContainer = createContainer(useUsersContainer);

export default UsersContainer;
