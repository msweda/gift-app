/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const claimGift = `mutation ClaimGift($input: ClaimGiftInput!) {
  claimGift(input: $input) {
    id
    user {
      id
      name
      gifts {
        nextToken
      }
      claimedGifts {
        nextToken
      }
    }
    name
    description
    rating
    price
    url
    claimUser {
      id
      name
      gifts {
        nextToken
      }
      claimedGifts {
        nextToken
      }
    }
    claimedAt
  }
}
`;
export const unclaimGift = `mutation UnclaimGift($input: UnclaimGiftInput!) {
  unclaimGift(input: $input) {
    id
    user {
      id
      name
      gifts {
        nextToken
      }
      claimedGifts {
        nextToken
      }
    }
    name
    description
    rating
    price
    url
    claimUser {
      id
      name
      gifts {
        nextToken
      }
      claimedGifts {
        nextToken
      }
    }
    claimedAt
  }
}
`;
export const createGift = `mutation CreateGift($input: CreateGiftInput!) {
  createGift(input: $input) {
    id
    user {
      id
      name
      gifts {
        nextToken
      }
      claimedGifts {
        nextToken
      }
    }
    name
    description
    rating
    price
    url
    claimUser {
      id
      name
      gifts {
        nextToken
      }
      claimedGifts {
        nextToken
      }
    }
    claimedAt
  }
}
`;
export const updateGift = `mutation UpdateGift($input: UpdateGiftInput!) {
  updateGift(input: $input) {
    id
    user {
      id
      name
      gifts {
        nextToken
      }
      claimedGifts {
        nextToken
      }
    }
    name
    description
    rating
    price
    url
    claimUser {
      id
      name
      gifts {
        nextToken
      }
      claimedGifts {
        nextToken
      }
    }
    claimedAt
  }
}
`;
export const deleteGift = `mutation DeleteGift($input: DeleteGiftInput!) {
  deleteGift(input: $input) {
    id
    user {
      id
      name
      gifts {
        nextToken
      }
      claimedGifts {
        nextToken
      }
    }
    name
    description
    rating
    price
    url
    claimUser {
      id
      name
      gifts {
        nextToken
      }
      claimedGifts {
        nextToken
      }
    }
    claimedAt
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    gifts {
      items {
        id
        name
        description
        rating
        price
        url
        claimedAt
      }
      nextToken
    }
    claimedGifts {
      items {
        id
        name
        description
        rating
        price
        url
        claimedAt
      }
      nextToken
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    name
    gifts {
      items {
        id
        name
        description
        rating
        price
        url
        claimedAt
      }
      nextToken
    }
    claimedGifts {
      items {
        id
        name
        description
        rating
        price
        url
        claimedAt
      }
      nextToken
    }
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    name
    gifts {
      items {
        id
        name
        description
        rating
        price
        url
        claimedAt
      }
      nextToken
    }
    claimedGifts {
      items {
        id
        name
        description
        rating
        price
        url
        claimedAt
      }
      nextToken
    }
  }
}
`;
