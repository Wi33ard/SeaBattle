import { createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

const PORT = 4000;
const users = [
  { id: '4a737d88-0b1b-45dc-96f9-4b5e9d4ad5ce', name: 'Yurozzavr'},
  { id: 'c699a58a-72ca-4bde-b74c-5b957f9b1cf2', name: 'Valcyria'},
  { id: '15888e46-6e09-494f-ac7a-9903b3b09bcd', name: 'Wizzard'},
];

const typeDefs = `
  type User {
    id: ID!
    name: String!
  }

  type Query {
    users: [User]!
  }
`;

const resolvers = {
  Query: {
    users: () => users,
  }
}

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers
  })
});

const server = createServer(yoga);

server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}/graphql`)
});