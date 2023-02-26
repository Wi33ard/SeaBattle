import mongoose, { Document, Schema } from "mongoose";

export interface Disposition extends Document {
  userId: string;
  gameId: string;
  fields: Int32Array;
};

const DispositionSchema: Schema = new mongoose.Schema(
  {
    userId: String,
    gameId: String,
    fields: Array<Number>,
  }
);

export default mongoose.model<Disposition>("Disposition", DispositionSchema);
