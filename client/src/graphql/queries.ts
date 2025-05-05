import { gql } from "@apollo/client";

export const GET_OWN_DISPOSITION = gql`
  query getOwnDisposition($id: ID!) {
    ownDisposition(_id: $id) {
      id
      gameId
      userId
      fields
    }
  }
`;

export const GET_DISPOSITION = gql`
  query getDisposition($id: ID!) {
    disposition(_id: $id) {
      id
      gameId
      userId
      fields
    }
  }
`;

export const GET_DISPOSITIONS = gql`
  query getDispositions($gameId: ID!) {
    dispositions(gameId: $gameId) {
      id
      userId
      gameId
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
