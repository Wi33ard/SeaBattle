import { createSchema, createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import mongoose from "mongoose";
import resolvers from './resolvers/resolvers';
import "dotenv-safe/config.js";
import { typeDefs } from './typedefs/typedefs';

mongoose
  .connect(process.env.DATABASE_URL!)
  .then(() => console.log(`DB connected!`))
  .catch((err) => console.error(err));

const PORT = 4000;

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers
  })
});

const server = createServer(yoga);

server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}/graphql`);
});