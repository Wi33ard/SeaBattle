import { createServer } from 'node:http';
import mongoose from "mongoose";
import resolvers from './resolvers/resolvers';
import { typeDefs } from './typedefs/typedefs';
import "dotenv-safe/config.js";
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

mongoose
  .connect(process.env.DATABASE_URL!)
  .then(() => console.log(`DB connected!`))
  .catch((err) => console.error(err));

async function startApolloServer() {
  // Required logic for integrating with Express
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use serves expressMiddleware at a different path
    path: '/graphql',
  });

  // Hand in the schema we just created and have the WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);
    // Ensure we wait for our server to start
  await server.start();

  // Set up our Express middleware to handle CORS, body parsing, and our expressMiddleware function.
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  // server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: process.env.PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/`);
}

startApolloServer();
