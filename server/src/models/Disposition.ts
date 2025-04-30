import mongoose, { Document, Schema } from "mongoose";

export interface Disposition extends Document {
  userId: string;
  gameId: string;
  fields: Int32Array;
  open: Array<Boolean>;
};

const DispositionSchema: Schema = new mongoose.Schema(
  {
    userId: String,
    gameId: String,
    fields: Array<Number>,
    open: Array<Boolean>,
  }
);

export default mongoose.model<Disposition>("Disposition", DispositionSchema);
