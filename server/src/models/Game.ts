import { Schema, model } from 'mongoose';

const Game = new Schema({
    user1: {type: Schema.Types.ObjectId, ref: 'User'},
    user2: {type: Schema.Types.ObjectId, ref: 'User'},
    startedAt: {type: Date},
    endedAt: {type: Date},
})

export default model('Game', Game);
