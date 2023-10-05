import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {FriendRequest} from "./interfaces/friends.interface";
import {User, UserDocument} from "../user/schemas/users.schema";

@Injectable()
export class FriendRequestsService {
    constructor(
        @InjectModel('FriendRequest') private readonly friendRequestModel: Model<FriendRequest>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async createFriendRequest(fromUser: string, toUser: string): Promise<FriendRequest> {
        const existingRequest = await this.friendRequestModel.findOne({ fromUser, toUser, status: 'pending' });
        if (existingRequest) {
            throw new Error('Friend request already sent.');
        }

        const friendRequest = new this.friendRequestModel({ fromUser, toUser });
        return friendRequest.save();
    }

    async updateFriendRequestStatus(requestId: string, status: string): Promise<FriendRequest> {
        const friendRequest = await this.friendRequestModel.findByIdAndUpdate(requestId, { status }, { new: true });

        if (status === 'accepted') {
            const { fromUser, toUser } = friendRequest

            // Add the sender to the receiver's friends list
            await this.userModel.findByIdAndUpdate(fromUser, { $push: { friends: toUser } });

            // Add the receiver to the sender's friends list
            await this.userModel.findByIdAndUpdate(toUser, { $push: { friends: fromUser } });
        }

        return friendRequest;
    }


    async findPendingFriendRequests(userId: string): Promise<FriendRequest[]> {
        return this.friendRequestModel.find({ toUser: userId, status: 'pending' }).populate('fromUser', 'username');
    }

    async getAllUserFriends(userId: string) {
        const user = await this.userModel.findById(userId).populate('friends')
        return user.friends
    }
}
