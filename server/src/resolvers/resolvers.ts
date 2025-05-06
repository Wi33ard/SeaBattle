import { PubSub } from 'graphql-subscriptions';
import Disposition from "../models/Disposition";
import User from "../models/User";
import Game from "../models/Game";
import { DateTimeResolver } from 'graphql-scalars';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-errors';
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
      if (disposition) {
        disposition.fields = disposition.fields.map((field, index) => disposition.open[index] ? field : -1);
      }
      console.log('disposition: ', disposition);
      return disposition;
    },
    // @ts-ignore
    ownDisposition: async (_parent, args, _context, _info) => {
      const disposition = await Disposition.findOne({ _id: args._id });
      console.log('ownDisposition: ', disposition);
      return disposition;
    },
    games: async () => {
      const games = await Game.find({}).populate('user1').populate('user2');
      return games;
    }
  },

  // M U T A T I O N S
  Mutation: {
    updateFieldState: (async (_parent: {}, args: {dispositionId: string, index: number, state: number}, _context: {}) => {
      const { dispositionId, index, state } = args;

      const dispositionUpdated = await Disposition.findOneAndUpdate(
        { _id: dispositionId },
        { $set: {
          [`fields.${index}`]: state,
        }},
        { new: true }
      );

      pubsub.publish(DISPOSITION_UPDATED, { dispositionUpdated });

      return true;
    }),
    makeShot: (async (_parent: {}, args: {dispositionId: string, index: number}, _context: {}) => {
      const { dispositionId, index } = args;

      const disposition = await Disposition.findOne({ _id: dispositionId });

      if (!disposition) {
        return false;
      }

      const newState = disposition.fields[index] === 1 ? 2 : disposition.fields[index];

      const dispositionUpdated = await Disposition.findOneAndUpdate(
        { _id: dispositionId },
        { $set: {
          [`fields.${index}`]: newState,
          [`open.${index}`]: true,
        }},
        { new: true }
      );

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
    login: (async (_parent: {}, args: {username: string, password: string}, _context: {}) => {
      try {
        const {username: name, password} = args;
        const user = await User.findOne({name});
        if (!user) {
          throw new ApolloError(`Пользователь ${name} не найден`, 'USER_NOT_FOUND');
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
          throw new ApolloError('Введен неверный пароль', 'WRONG_PASSWORD');
        }
        
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY || 'SECRET_KEY', {expiresIn: "24h"} );
        return { id: user.id, token };
      } catch (e) {
        console.log(e);
        throw new ApolloError('Error occured in login process', 'LOGIN_ERROR');
      }
    })
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
