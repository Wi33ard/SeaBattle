import { gql } from "@apollo/client";

export const GAME_CREATED_SUBSCRIPTION = gql`
  subscription GameCreated {
    gameCreated {
      id
      user1 {
        id
        name
        rating
      }
    }  
  }
`;

export const GAME_DELETED_SUBSCRIPTION = gql`
  subscription GameDeleted {
    gameDeleted
  }
`;


export const DISPOSITION_UPDATED_SUBSCRIPTION = gql`
  subscription DispositionUpdated($id: ID!) {
    dispositionUpdated(_id: $id) {
      gameId
      userId
      fields
    }
  }
`;
