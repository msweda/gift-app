import { useEffect } from 'react';
import { giftsForUser } from 'graphql/queries';
import { createGift, deleteGift, updateGift } from 'graphql/mutations';
import { createContainer } from 'unstated-next';
import AuthContainer from './AuthContainer';
import useAPI from 'hooks/useAPI';

const useGiftContainer = () => {
  const authContainer = AuthContainer.useContainer();
  const { cognitoSub } = authContainer;

  const giftsAPI = useAPI();
  const gifts = giftsAPI.response;
  const fetchGifts = async () => {
    await giftsAPI.request(
      giftsForUser,
      {
        userId: cognitoSub,
        limit: 100,
      },
      response => response.data.giftsForUser.items,
    );
  };

  const addedGiftAPI = useAPI();
  const addedGift = addedGiftAPI.response;
  const addGift = async input => {
    if (addedGift.loading) {
      return;
    }
    await addedGiftAPI.request(
      createGift,
      {
        input: {
          ...input,
          giftUserId: cognitoSub,
        },
      },
      response => response.data.createGift,
    );
  };

  useEffect(() => {
    if (!addedGift.data) {
      return;
    }
    const dataWithGiftAdded = gifts.data ? gifts.data.slice() : [];
    dataWithGiftAdded.push(addedGift.data);
    giftsAPI.setData(dataWithGiftAdded);
  }, [addedGift.data]);

  const editedGiftAPI = useAPI();
  const editedGift = editedGiftAPI.response;
  const editGift = async input => {
    if (editedGift.loading) {
      return;
    }
    await editedGiftAPI.request(
      updateGift,
      {
        input,
      },
      response => response.data.updateGift,
    );
  };

  useEffect(() => {
    if (!editedGift.data) {
      return;
    }
    const dataWithGiftEdited = gifts.data ? gifts.data.slice() : [];
    dataWithGiftEdited.forEach((entry, index) => {
      if (entry.id === editedGift.data.id) {
        dataWithGiftEdited[index] = editedGift.data;
      }
    });
    giftsAPI.setData(dataWithGiftEdited);
  }, [editedGift.data]);

  const removedGiftAPI = useAPI();
  const removedGift = removedGiftAPI.response;
  const removeGift = async input => {
    if (removedGift.loading) {
      return;
    }
    await removedGiftAPI.request(
      deleteGift,
      {
        input,
      },
      response => response.data.deleteGift,
    );
  };

  useEffect(() => {
    if (!removedGift.data) {
      return;
    }
    const dataWithGiftRemoved = gifts.data ? gifts.data.filter(entry => entry.id !== removedGift.data.id) : [];
    giftsAPI.setData(dataWithGiftRemoved);
  }, [removedGift.data]);

  return { addedGift, addGift, editedGift, editGift, removedGift, removeGift, fetchGifts, gifts };
};

const GiftContainer = createContainer(useGiftContainer);

export default GiftContainer;
