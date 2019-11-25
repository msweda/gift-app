/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGift = `subscription OnCreateGift {
  onCreateGift {
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
export const onUpdateGift = `subscription OnUpdateGift {
  onUpdateGift {
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
export const onDeleteGift = `subscription OnDeleteGift {
  onDeleteGift {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
