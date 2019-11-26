import { API, graphqlOperation } from 'aws-amplify';
import { createGift, deleteGift, updateGift } from 'graphql/mutations';
import { getUser } from 'graphql/queries';
import { useReducer } from 'react';
import { createContainer } from 'unstated-next';
import AuthContainer from './AuthContainer';

const defaultState = {
  addedGift: {
    data: undefined,
    error: undefined,
    loading: false,
  },
  editedGift: {
    data: undefined,
    error: undefined,
    loading: false,
  },
  removedGift: {
    data: undefined,
    error: undefined,
    loading: false,
  },
  gifts: {
    data: undefined,
    error: undefined,
    loading: false,
  },
};

const GiftsReducerType = {
  FETCH_GIFTS_REQUEST: 'FETCH_GIFTS_REQUEST',
  FETCH_GIFTS_SUCCESS: 'FETCH_GIFTS_SUCCESS',
  FETCH_GIFTS_FAILURE: 'FETCH_GIFTS_FAILURE',
  GIFT_ADDED: 'GIFT_ADDED',
  GIFT_EDITED: 'GIFT_EDITED',
  GIFT_REMOVED: 'GIFT_REMOVED',
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
    case GiftsReducerType.GIFT_ADDED:
      const dataWithGiftAdded = state.data ? state.data.slice() : [];
      dataWithGiftAdded.push(action.gift);
      return {
        ...state,
        data: dataWithGiftAdded,
      };
    case GiftsReducerType.GIFT_EDITED:
      const dataWithGiftEdited = state.data ? state.data.slice() : [];
      dataWithGiftEdited.forEach((entry, index) => {
        if (entry.id === action.gift.id) {
          dataWithGiftEdited[index] = action.gift;
        }
      });
      return {
        ...state,
        data: dataWithGiftEdited,
      };
    case GiftsReducerType.GIFT_REMOVED:
      const dataWithGiftRemoved = state.data ? state.data.filter(entry => entry.id !== action.gift.id) : [];
      return {
        ...state,
        data: dataWithGiftRemoved,
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

const EditedGiftReducerType = {
  EDIT_GIFT_REQUEST: 'EDIT_GIFT_REQUEST',
  EDIT_GIFT_SUCCESS: 'EDIT_GIFT_SUCCESS',
  EDIT_GIFT_FAILURE: 'EDIT_GIFT_FAILURE',
};

const editedGiftReducer = (state, action) => {
  switch (action.type) {
    case EditedGiftReducerType.EDIT_GIFT_REQUEST:
      return {
        ...state,
        error: defaultState.editedGift.error,
        loading: true,
      };
    case EditedGiftReducerType.EDIT_GIFT_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case EditedGiftReducerType.EDIT_GIFT_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      throw new Error('GiftContainer - editedGiftReducer received unknown action');
  }
};

const RemovedGiftReducerType = {
  REMOVE_GIFT_REQUEST: 'REMOVE_GIFT_REQUEST',
  REMOVE_GIFT_SUCCESS: 'REMOVE_GIFT_SUCCESS',
  REMOVE_GIFT_FAILURE: 'REMOVE_GIFT_FAILURE',
};

const removedGiftReducer = (state, action) => {
  switch (action.type) {
    case RemovedGiftReducerType.REMOVE_GIFT_REQUEST:
      return {
        ...state,
        error: defaultState.removedGift.error,
        loading: true,
      };
    case RemovedGiftReducerType.REMOVE_GIFT_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case RemovedGiftReducerType.REMOVE_GIFT_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      throw new Error('GiftContainer - removedGiftReducer received unknown action');
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
    if (addedGift.loading) {
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
      giftsDispatch({
        type: GiftsReducerType.GIFT_ADDED,
        gift: response.data.createGift,
      });
    } catch (e) {
      addedGiftDispatch({
        type: AddedGiftReducerType.ADD_GIFT_FAILURE,
        error: e,
      });
    }
  };

  const [editedGift, editedGiftDispatch] = useReducer(editedGiftReducer, initialState.editedGift);
  const editGift = async (input, config = {}) => {
    if (editedGift.loading) {
      return;
    }
    editedGiftDispatch({
      type: EditedGiftReducerType.EDIT_GIFT_REQUEST,
    });
    try {
      const response = await API.graphql(
        graphqlOperation(updateGift, {
          input,
        }),
      );
      editedGiftDispatch({
        type: EditedGiftReducerType.EDIT_GIFT_SUCCESS,
        data: response.data.updateGift,
      });
      giftsDispatch({
        type: GiftsReducerType.GIFT_EDITED,
        gift: response.data.updateGift,
      });
    } catch (e) {
      editedGiftDispatch({
        type: EditedGiftReducerType.EDIT_GIFT_FAILURE,
        error: e,
      });
    }
  };

  const [removedGift, removedGiftDispatch] = useReducer(removedGiftReducer, initialState.removedGift);
  const removeGift = async (input, config = {}) => {
    if (removedGift.loading) {
      return;
    }
    removedGiftDispatch({
      type: RemovedGiftReducerType.REMOVE_GIFT_REQUEST,
    });
    try {
      const response = await API.graphql(
        graphqlOperation(deleteGift, {
          input,
        }),
      );
      removedGiftDispatch({
        type: RemovedGiftReducerType.REMOVE_GIFT_SUCCESS,
        data: response.data.removeGift,
      });
      giftsDispatch({
        type: GiftsReducerType.GIFT_REMOVED,
        gift: response.data.deleteGift,
      });
    } catch (e) {
      removedGiftDispatch({
        type: RemovedGiftReducerType.REMOVE_GIFT_FAILURE,
        error: e,
      });
    }
  };

  return { addedGift, addGift, editedGift, editGift, removedGift, removeGift, fetchGifts, gifts };
};

const GiftContainer = createContainer(useGiftContainer);

export default GiftContainer;
