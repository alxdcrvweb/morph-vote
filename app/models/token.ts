import mongoose from "mongoose";

export interface IToken extends mongoose.Document {
  tokenId: number;
  votedFor?: number;
  voter?: number;
}

const TokenSchema = new mongoose.Schema<IToken>({
  tokenId: Number,
  votedFor: Number,
  voter: Number,
});

const Token =
  mongoose.models.token || mongoose.model<IToken>("token", TokenSchema);
export default Token;
