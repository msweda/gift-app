import { useState } from 'react';
import { createContainer } from 'unstated-next';

const defaultState = {
  cognitoSub: undefined,
};

const useAuthContainer = (initialState = defaultState) => {
  const [cognitoSub, setCognitoSub] = useState(initialState.cognitoSub);
  return { cognitoSub, setCognitoSub };
};

const AuthContainer = createContainer(useAuthContainer);

export default AuthContainer;
