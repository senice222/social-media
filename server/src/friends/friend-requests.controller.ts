import {Controller, Post, Body, Param, Put, Get, UseGuards} from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import {FriendRequest} from "./interfaces/friends.interface";
import {AuthGuard} from "@nestjs/passport";
import {UserId} from "../decorators/user-id.decorator";

@Controller('friends')
export class FriendRequestsController {
    constructor(private readonly friendRequestsService: FriendRequestsService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('request/send')
    async sendFriendRequest(@UserId() id: string, @Body() body: { toUser: string }): Promise<FriendRequest> {
        return this.friendRequestsService.createFriendRequest(id, body.toUser);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':requestId')
    async updateFriendRequestStatus(@Param('requestId') requestId: string, @Body() body: { status: string }): Promise<FriendRequest> {
        return this.friendRequestsService.updateFriendRequestStatus(requestId, body.status);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':userId/pending')
    async getPendingFriendRequests(@Param('userId') userId: string): Promise<FriendRequest[]> {
        return this.friendRequestsService.findPendingFriendRequests(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAllUserFriends(@UserId() userId: string): Promise<any> {
        return this.friendRequestsService.getAllUserFriends(userId);
    }


}
