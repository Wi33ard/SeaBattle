export const typeDefs = `
  type User {
    id: ID!
    name: String!
  }

  type Disposition {
    id: ID!
    userId: ID!
    gameId: ID!
    fields: [Int]!
  }

  type Query {
    users: [User]!,
    dispositions: [Disposition]!,
    disposition(_id: ID!): Disposition
  }

  type Mutation {
    updateFieldState(dispositionId: ID!, index: Int!, state: Int!): Boolean
  }

  type Subscription {
    dispositionUpdated(_id: ID!): Disposition
  }
`;