import { API, graphqlOperation } from 'aws-amplify';
import { giftsForUser } from 'graphql/queries';
import { useReducer } from 'react';
import { createContainer } from 'unstated-next';
import AuthContainer from './AuthContainer';
import useAPI from 'hooks/useAPI';

const useOtherUserGiftsContainer = (initialState = defaultState) => {
  const authContainer = AuthContainer.useContainer();
  const { cognitoSub } = authContainer;

  const gifts = useAPI();

  const [gifts, giftsDispatch] = useReducer(giftsReducer, initialState.gifts);
  const fetchGifts = async userId => {
    giftsDispatch({
      type: GiftsReducerType.FETCH_GIFTS_REQUEST,
    });
    try {
      const response = await API.graphql(
        graphqlOperation(giftsForUser, {
          userId,
        }),
      );
      giftsDispatch({
        type: GiftsReducerType.FETCH_GIFTS_SUCCESS,
        data: response.data.giftsForUser.items,
      });
    } catch (e) {
      giftsDispatch({
        type: GiftsReducerType.FETCH_GIFTS_FAILURE,
        error: e,
      });
    }
  };

  return { fetchGifts, gifts };
};

const OtherUserGiftsContainer = createContainer(useOtherUserGiftsContainer);

export default OtherUserGiftsContainer;
