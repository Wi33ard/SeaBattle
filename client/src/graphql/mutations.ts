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