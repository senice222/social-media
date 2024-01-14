import {Document, ObjectId} from "mongoose";

export interface FriendRequest extends Document {
    fromUser: ObjectId;
    toUser: ObjectId;
    status: string;
    createdAt: Date;
}