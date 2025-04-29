import { gql } from "@apollo/client";

export const GET_DISPOSITION = gql`
  query getDisposition($id: ID!) {
    disposition(_id: $id) {
      gameId
      userId
      fields
    }
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

export const GET_DISPOSITIONS = gql`
  query getDispositions {
    dispositions {
      id
      userId
      gameId
      fields
    }
  }
`;

export const GET_GAMES = gql`
  query getGames {
    games {
      id
      user1 {
        id
        name
        rating
      }
      user2 {
        id
        name
        rating
      }
    }
  }
`;
