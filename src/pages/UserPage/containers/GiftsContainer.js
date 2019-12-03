import { useEffect } from 'react';
import { giftsForUser } from 'graphql/queries';
import { claimGift as claimGiftMutation, unclaimGift as unclaimGiftMutation } from 'graphql/mutations';
import { createContainer } from 'unstated-next';
import useAPI from 'hooks/useAPI';

const useGiftsContainer = () => {
  const giftsAPI = useAPI();
  const fetchGifts = async userId => {
    await giftsAPI.request(
      giftsForUser,
      {
        userId,
        limit: 100,
      },
      response => response.data.giftsForUser.items,
    );
  };
  const gifts = giftsAPI.response;

  const claimedGiftAPI = useAPI();
  const claimGift = async giftId => {
    await claimedGiftAPI.request(
      claimGiftMutation,
      {
        input: {
          id: giftId,
        },
      },
      response => response.data.claimGift,
    );
  };
  const claimedGift = claimedGiftAPI.response;

  useEffect(() => {
    if (!claimedGift.data) {
      return;
    }
    const newGifts = [];
    gifts.data.forEach(gift => {
      if (gift.id === claimedGift.data.id) {
        newGifts.push(claimedGift.data);
      } else {
        newGifts.push(gift);
      }
    });
    giftsAPI.setData(newGifts);
  }, [claimedGift.data]);

  const unclaimedGiftAPI = useAPI();
  const unclaimGift = async giftId => {
    await unclaimedGiftAPI.request(
      unclaimGiftMutation,
      {
        input: {
          id: giftId,
        },
      },
      response => response.data.unclaimGift,
    );
  };
  const unclaimedGift = unclaimedGiftAPI.response;

  useEffect(() => {
    if (!unclaimedGift.data) {
      return;
    }
    const newGifts = [];
    gifts.data.forEach(gift => {
      if (gift.id === unclaimedGift.data.id) {
        newGifts.push(unclaimedGift.data);
      } else {
        newGifts.push(gift);
      }
    });
    giftsAPI.setData(newGifts);
  }, [unclaimedGift.data]);

  return { claimedGift, claimGift, fetchGifts, gifts, unclaimedGift, unclaimGift };
};

const GiftsContainer = createContainer(useGiftsContainer);

export default GiftsContainer;
