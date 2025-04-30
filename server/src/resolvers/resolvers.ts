import { PubSub } from 'graphql-subscriptions';
import Disposition from "../models/Disposition";
import User from "../models/User";
import Game from "../models/Game";
import { DateTimeResolver } from 'graphql-scalars';
import { DISPOSITION_UPDATED, FIELDS_COUNT, GAME_CREATED, GAME_DELETED } from '../const';

const pubsub = new PubSub();

const resolvers = {
  // T Y P E S
  DateTime: DateTimeResolver,

  // Q U E R I E S
  Query: {
    users: async () => {
      const users = await User.find({});
      return users;
    },
    // @ts-ignore
    dispositions: async (_parent, args, _context, _info) => {
      const { gameId } = args;
      const dispositions = await Disposition.find({ gameId });
      return dispositions;
    },
    // @ts-ignore
    disposition: async (_parent, args, _context, _info) => {
      const disposition = await Disposition.findOne({ _id: args._id });
      return disposition;
    },
    games: async () => {
      const games = await Game.find({}).populate('user1').populate('user2');
      console.log('games: ', games);
      return games;
    }
  },

  // M U T A T I O N S
  Mutation: {
    updateFieldState: (async (_parent: {}, args: {dispositionId: string, index: number, state: number}, _context: {}) => {
      const { dispositionId, index, state } = args;
      console.log("index: ", index);

      const dispositionUpdated = await Disposition.findOneAndUpdate(
        { _id: dispositionId },
        { $set: {[`fields.${index}`]: state } },
        { new: true }
      );

      console.log("dispositionUpdated: ", dispositionUpdated);
      pubsub.publish(DISPOSITION_UPDATED, { dispositionUpdated });

      return true;
    }),
    createGame: (async (_parent: {}, args: {userId: string}, _context: {}) => {
      const { userId } = args;

      const gameCreated = await Game.create({
        user1: userId
      }).then((game) => game.populate('user1', 'name'));

      pubsub.publish(GAME_CREATED, { gameCreated });

      return gameCreated;
    }),
    deleteGame: (async (_parent: {}, args: {id: string}, _context: {}) => {
      const { id } = args;

      const result = await Game.deleteOne({ id });

      if (result.deletedCount > 0) {
        pubsub.publish(GAME_DELETED, { gameDeleted: id });
      }

      return id;
    }),
    createDisposition: (async (_parent: {}, args: {gameId: string, userId: string}, _context: {}) => {
      const { gameId, userId } = args;

      const disposition = await Disposition.create({
        gameId,
        userId,
        fields: new Array(FIELDS_COUNT).fill(0),
        open: new Array(FIELDS_COUNT).fill(false),
      });

      return disposition;
    }),
  },

  // S U B S C R I P T I O N S
  Subscription: {
    dispositionUpdated: {
      subscribe: () => pubsub.asyncIterator([DISPOSITION_UPDATED])
    },
    gameCreated: {
      subscribe: () => pubsub.asyncIterator([GAME_CREATED])
    },
    gameDeleted: {
      subscribe: () => pubsub.asyncIterator([GAME_DELETED])
    },
  },
};

export default resolvers;
