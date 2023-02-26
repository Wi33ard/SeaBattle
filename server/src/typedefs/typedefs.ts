export const typeDefs = `
type User {
  id: ID!
  name: String!
}

type Disposition {
  userId: ID!
  gameId: ID!
  fields: [Int]!
}

type Query {
  users: [User]!,
  dispositions: [Disposition]!
}

type Mutation {
  updateFieldState(gameId: String!, userId: String!, index: Int!, state: Int!): Boolean
}
`;