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
    open: [Boolean]
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
    dispositions(gameId: ID!): [Disposition]!,
    disposition(_id: ID!): Disposition,
    ownDisposition(_id: ID!): Disposition,
    games: [Game],
  }
  
  type LoginResponse {
    id: String
    token: String
  }

  type Mutation {
    updateFieldState(dispositionId: ID!, index: Int!, state: Int!): Boolean,
    makeShot(dispositionId: ID!, index: Int!): Boolean,
    createGame(userId: ID!): Game
    deleteGame(id: ID!): ID
    createDisposition(gameId: ID!, userId: ID!): Disposition
    login(username: String!, password: String!): LoginResponse
  }

  type Subscription {
    dispositionUpdated(_id: ID!): Disposition,
    gameCreated: Game,
    gameDeleted: ID,
  }
`;