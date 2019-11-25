import { API, graphqlOperation } from 'aws-amplify';
import { createGift } from 'graphql/mutations';
import { getUser } from 'graphql/queries';
import { useReducer } from 'react';
import { createContainer } from 'unstated-next';
import AuthContainer from './AuthContainer';

const defaultState = {
  gifts: {
    data: undefined,
    error: undefined,
    loading: false,
  },
  addedGift: {
    data: undefined,
    error: undefined,
    loading: false,
  },
};

const GiftsReducerType = {
  FETCH_GIFTS_REQUEST: 'FETCH_GIFTS_REQUEST',
  FETCH_GIFTS_SUCCESS: 'FETCH_GIFTS_SUCCESS',
  FETCH_GIFTS_FAILURE: 'FETCH_GIFTS_FAILURE',
};

const giftsReducer = (state, action) => {
  switch (action.type) {
    case GiftsReducerType.FETCH_GIFTS_REQUEST:
      return {
        ...state,
        error: defaultState.gifts.error,
        loading: true,
      };
    case GiftsReducerType.FETCH_GIFTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case GiftsReducerType.FETCH_GIFTS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      throw new Error('GiftContainer - giftsReducer received unknown action');
  }
};

const AddedGiftReducerType = {
  ADD_GIFT_REQUEST: 'ADD_GIFT_REQUEST',
  ADD_GIFT_SUCCESS: 'ADD_GIFT_SUCCESS',
  ADD_GIFT_FAILURE: 'ADD_GIFT_FAILURE',
};

const addedGiftReducer = (state, action) => {
  switch (action.type) {
    case AddedGiftReducerType.ADD_GIFT_REQUEST:
      return {
        ...state,
        error: defaultState.addedGift.error,
        loading: true,
      };
    case AddedGiftReducerType.ADD_GIFT_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case AddedGiftReducerType.ADD_GIFT_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      throw new Error('GiftContainer - addedGiftReducer received unknown action');
  }
};

const useGiftContainer = (initialState = defaultState) => {
  const authContainer = AuthContainer.useContainer();
  const { cognitoSub } = authContainer;

  const [gifts, giftsDispatch] = useReducer(giftsReducer, initialState.gifts);
  const fetchGifts = async (config = {}) => {
    const { refreshData } = config;
    if (gifts.data && !gifts.loading && !refreshData) {
      return;
    }
    giftsDispatch({
      type: GiftsReducerType.FETCH_GIFTS_REQUEST,
    });
    try {
      const response = await API.graphql(
        graphqlOperation(getUser, {
          id: cognitoSub,
        }),
      );
      giftsDispatch({
        type: GiftsReducerType.FETCH_GIFTS_SUCCESS,
        data: response.data.getUser.gifts.items,
      });
    } catch (e) {
      giftsDispatch({
        type: GiftsReducerType.FETCH_GIFTS_FAILURE,
        error: e,
      });
    }
  };

  const [addedGift, addedGiftDispatch] = useReducer(addedGiftReducer, initialState.addedGift);
  const addGift = async (input, config = {}) => {
    const { refreshData } = config;
    if (addedGift.data && !addedGift.loading && !refreshData) {
      return;
    }
    addedGiftDispatch({
      type: AddedGiftReducerType.ADD_GIFT_REQUEST,
    });
    try {
      const response = await API.graphql(
        graphqlOperation(createGift, {
          input: {
            ...input,
            giftUserId: cognitoSub,
          },
        }),
      );
      addedGiftDispatch({
        type: AddedGiftReducerType.ADD_GIFT_SUCCESS,
        data: response.data.createGift,
      });
    } catch (e) {
      addedGiftDispatch({
        type: AddedGiftReducerType.ADD_GIFT_FAILURE,
        error: e,
      });
    }
  };

  return { addedGift, addGift, fetchGifts, gifts };
};

const GiftContainer = createContainer(useGiftContainer);

export default GiftContainer;
