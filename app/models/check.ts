import mongoose from "mongoose";

export interface ICheck extends mongoose.Document {
    isInitialized: boolean;
}

const CheckSchema = new mongoose.Schema<ICheck>({
    isInitialized: Boolean
});

const Check = mongoose.models.Check || mongoose.model<ICheck>("Check", CheckSchema);
export default Check;