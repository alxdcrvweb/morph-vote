import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    fid: number;
    address: string;
    winner: boolean;
}

const UserSchema = new mongoose.Schema<IUser>({
    fid: Number,
    address: String,
    winner: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.models.user || mongoose.model<IUser>("user", UserSchema);
export default User;