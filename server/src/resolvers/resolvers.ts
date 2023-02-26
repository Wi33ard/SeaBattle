import mongoose, { ObjectId } from "mongoose";
import Disposition from "../models/Disposition";

const users = [
  { id: '4a737d88-0b1b-45dc-96f9-4b5e9d4ad5ce', name: 'Yurozzavr'},
  { id: 'c699a58a-72ca-4bde-b74c-5b957f9b1cf2', name: 'Valcyria'},
  { id: '15888e46-6e09-494f-ac7a-9903b3b09bcd', name: 'Wizzard'},
];

const resolvers = {
  Query: {
    users: () => users,
    dispositions: async () => {
      const dispositions = await Disposition.find({});
      return dispositions;
    },
  },
  Mutation: {
    updateFieldState: (async (_root: {}, args: {gameId: string, userId: string, index: number, state: number}, _ctx: {}) => {
      const { gameId, userId, index, state } = args;
      console.log("index: ", index);

      const dispositionUpdated = await Disposition.findOneAndUpdate(
        { gameId, userId },
        { $set: {[`fields.${index}`]: state } },
        { new: true }
      );

      console.log("dispositionUpdated: ", dispositionUpdated);

      return true;
    }),
  }
};

export default resolvers;
