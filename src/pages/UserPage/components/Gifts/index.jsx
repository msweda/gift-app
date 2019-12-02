import React from 'react';
import GiftsContainer from '../../containers/GiftsContainer';
import { default as Component } from './Gifts';

const ComponentWithContainerData = props => {
  const giftsContainer = GiftsContainer.useContainer();
  const { fetchGifts, gifts } = giftsContainer;
  return <Component {...props} fetchGifts={fetchGifts} gifts={gifts} />;
};

const Gifts = props => {
  return (
    <GiftsContainer.Provider>
      <ComponentWithContainerData {...props} />
    </GiftsContainer.Provider>
  );
};

export default Gifts;
