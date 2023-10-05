import * as mongoose from 'mongoose';
import {FriendRequest} from "../interfaces/friends.interface";

export const FriendRequestSchema = new mongoose.Schema({
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    createdAt: { type: Date, default: Date.now },
});

export const FriendRequestModel = mongoose.model<FriendRequest>('FriendRequest', FriendRequestSchema);