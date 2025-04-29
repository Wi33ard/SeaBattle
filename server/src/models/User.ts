import { Schema, model } from 'mongoose';

const User = new Schema({
    name: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    rating: {type: Number},
    roles: [{type: String, ref: 'Role'}]
})

export default model('User', User);
