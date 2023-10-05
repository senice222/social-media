import mongoose from "mongoose";

export interface FriendRequest extends mongoose.Document {
    fromUser: mongoose.Types.ObjectId;
    toUser: mongoose.Types.ObjectId;
    status: string;
    createdAt: Date;
}