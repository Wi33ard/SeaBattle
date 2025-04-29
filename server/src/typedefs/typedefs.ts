export const typeDefs = `
  scalar DateTime

  type User {
    id: ID!
    name: String!
    rating: Int
  }

  type Disposition {
    id: ID!
    userId: ID!
    gameId: ID!
    fields: [Int]!
  }
  
  type Game {
    id: ID!
    user1: User
    user2: User
    startedAt: DateTime
    endedAt: DateTime
  }

  type Query {
    users: [User]!,
    dispositions: [Disposition]!,
    disposition(_id: ID!): Disposition,
    games: [Game],
  }

  type Mutation {
    updateFieldState(dispositionId: ID!, index: Int!, state: Int!): Boolean,
    createGame(userId: ID!): Game
    deleteGame(id: ID!): ID
  }

  type Subscription {
    dispositionUpdated(_id: ID!): Disposition,
    gameCreated: Game,
    gameDeleted: ID,
  }
`;