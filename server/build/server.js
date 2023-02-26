"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const node_http_1 = require("node:http");
const mongoose_1 = __importDefault(require("mongoose"));
const resolvers_1 = __importDefault(require("./resolvers/resolvers"));
require("dotenv-safe/config.js");
mongoose_1.default
    .connect(process.env.DATABASE_URL)
    .then(() => console.log(`DB connected!`))
    .catch((err) => console.error(err));
const PORT = 4000;
const typeDefs = `
  type User {
    id: ID!
    name: String!
  }

  type Query {
    users: [User]!
  }
`;
const yoga = (0, graphql_yoga_1.createYoga)({
    schema: (0, graphql_yoga_1.createSchema)({
        typeDefs,
        resolvers: resolvers_1.default
    })
});
const server = (0, node_http_1.createServer)(yoga);
server.listen(PORT, () => {
    console.info(`Server is running on http://localhost:${PORT}/graphql`);
});
