import mongoose from "mongoose";
import Token from "../models/token";

let voteStart = new Date(2024, 4, 9, 13);
let voteEnd = new Date(voteStart.getTime() + 1000 * 60 * 60 * 72);

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

interface IVoteReturn {
  [id: number]: number;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
};

export const getUsersTokensFromIndexer = async (fid: number) => {
  let baseUrl = `https://index.mrphs.io/api/held/fid/${fid}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  let a = await fetch(baseUrl, options);
  let b = await a.json();
  return b;
};

export const getAvailableVotes = async (fid: number) => {
  await dbConnect();
  let b = await getUsersTokensFromIndexer(fid);
  let idArray = b.tokens.map((el: any) => {
    return el.tokenId;
  });
  let available = 0;
  for (let tokenId of idArray) {
    let token = await Token.findOne({ tokenId });
    if (!token) {
      token = new Token({
        tokenId,
      });
      await token.save();
    }
    if (!token.votedFor) {
      available++;
    }
  }
  return available;
};

export const vote = async (fid: number, voteOption: number) => {
  if(new Date() > voteEnd) {
    return false;
  }
  await dbConnect();
  let b = await getUsersTokensFromIndexer(fid);
  let idArray = b.tokens.map((el: any) => {
    return el.tokenId;
  });
  for (let tokenId of idArray) {
    let token = await Token.findOne({ tokenId });
    if (!token) {
      token = new Token({
        tokenId,
      });
      await token.save();
    }
    if (!token.votedFor) {
      token.votedFor = voteOption;
      token.voter = fid;
      await token.save();
    }
  }
  return true;
};

export const getResults = async () => {
  let tokens = await Token.find({ votedFor: { $exists: true } });
  let returnObj: IVoteReturn = {};
  for (let token of tokens) {
    returnObj[token.votedFor]
      ? returnObj[token.votedFor]++
      : (returnObj[token.votedFor] = 1);
  }
  return returnObj;
};
