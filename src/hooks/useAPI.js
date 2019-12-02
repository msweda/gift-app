import { useReducer } from 'react';
import { API, graphqlOperation } from 'aws-amplify';

const defaultState = {
  data: undefined,
  error: undefined,
  loading: false,
  loadingId: undefined,
};

const ReducerType = {
  REQUEST_STARTED: 'REQUEST_STARTED',
  REQUEST_SUCCESS: 'REQUEST_SUCCESS',
  REQUEST_FAILURE: 'REQUEST_FAILURE',
  SET_DATA: 'SET_DATA',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ReducerType.REQUEST_STARTED:
      return {
        ...state,
        error: defaultState.error,
        loading: true,
        loadingId: action.loadingId,
      };
    case ReducerType.REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: defaultState.loading,
        loadingId: defaultState.loadingId,
      };
    case ReducerType.REQUEST_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: defaultState.loading,
        loadingId: defaultState.loadingId,
      };
    case ReducerType.SET_DATA:
      return {
        ...state,
        data: action.data,
      };
    default:
      throw new Error('useAPI - reducer received unknown action');
  }
};

function useAPI(initialState = defaultState) {
  const [response, dispatch] = useReducer(reducer, initialState);
  const request = async (statement, variables, responseDataSelector) => {
    dispatch({
      type: ReducerType.REQUEST_STARTED,
    });
    try {
      const response = await API.graphql(graphqlOperation(statement, variables));
      dispatch({
        type: ReducerType.REQUEST_SUCCESS,
        data: responseDataSelector ? responseDataSelector(response) : response,
      });
    } catch (e) {
      dispatch({
        type: ReducerType.REQUEST_FAILURE,
        error: e,
      });
    }
  };
  const setData = data => {
    dispatch({
      type: ReducerType.SET_DATA,
      data,
    });
  };
  return { request, response, setData };
}

export default useAPI;
