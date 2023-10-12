import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {FriendRequest} from "./interfaces/friends.interface";
import {User, UserDocument} from "../user/schemas/users.schema";

@Injectable()
export class FriendRequestsService {
    constructor(
        @InjectModel('FriendRequest') private readonly friendRequestModel: Model<FriendRequest>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {
    }

    async createFriendRequest(fromUser: string, toUser: string): Promise<FriendRequest> {
        const existingRequest = await this.friendRequestModel.findOne({fromUser, toUser, status: 'pending'});
        const user = await this.userModel.findById(fromUser)
        const isFriend = user.friends.some(item => item.toString() === toUser)

        if (existingRequest) {
            throw new Error('Friend request already sent.');
        }
        if (isFriend) {
            throw new Error('You already have this user in friends.')
        }

        const friendRequest = new this.friendRequestModel({fromUser, toUser});
        return friendRequest.save();
    }

    async updateFriendRequestStatus(requestId: string, status: string): Promise<FriendRequest> {
        const friendRequest = await this.friendRequestModel.findByIdAndUpdate(requestId, {status}, {new: true});

        if (status === 'accepted') {
            const {fromUser, toUser} = friendRequest

            await this.userModel.findByIdAndUpdate(fromUser, {$push: {friends: toUser}});
            await this.userModel.findByIdAndUpdate(toUser, {$push: {friends: fromUser}});

            await this.friendRequestModel.findByIdAndDelete(requestId)
        } else {
            await this.friendRequestModel.findByIdAndDelete(requestId)
        }

        return friendRequest;
    }


    async findPendingFriendRequests(userId: string): Promise<FriendRequest[]> {
        return this.friendRequestModel.find({toUser: userId, status: 'pending'}).populate('fromUser', 'username');
    }

    async getAllUserFriends(userId: string) {
        const user = await this.userModel.findById(userId).populate('friends')
        return user.friends
    }
}
