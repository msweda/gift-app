/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGift = `query GetGift($id: ID!) {
  getGift(id: $id) {
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
export const listGifts = `query ListGifts(
  $filter: ModelGiftFilterInput
  $limit: Int
  $nextToken: String
) {
  listGifts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user {
        id
        name
      }
      name
      description
      rating
      price
      url
      claimUser {
        id
        name
      }
      claimedAt
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
        claimUser {
          id
          name
        }
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      gifts {
        nextToken
      }
      claimedGifts {
        nextToken
      }
    }
    nextToken
  }
}
`;
