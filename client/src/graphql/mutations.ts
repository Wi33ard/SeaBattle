import { gql } from "@apollo/client";

export const SET_CELL_STATUS = gql`
  mutation SetCellStatus($dispositionId: ID!, $index: Int!, $state: Int!) {
    updateFieldState (
      dispositionId: $dispositionId,
      index: $index,
      state: $state
    )
  }
`;

export const MAKE_SHOT = gql`
  mutation MakeShot($dispositionId: ID!, $index: Int!) {
    makeShot (
      dispositionId: $dispositionId,
      index: $index,
    )
  }
`;

export const CREATE_GAME = gql`
  mutation CreateGame($userId: ID!) {
    createGame (userId: $userId) {
      id
      user1 {
        id
        name
      }
    }
  }
`;

export const DELETE_GAME = gql`
  mutation DeleteGame($id: ID!) {
    deleteGame (id: $id)
  }
`;

export const CREATE_DISPOSITION = gql`
  mutation CreateDisposition($gameId: ID!, $userId: ID!) {
    createDisposition (gameId: $gameId, userId: $userId) {
      id
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login (username: $username, password: $password) {
      id
      token
    }  
  }
`;