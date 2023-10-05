import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequestsController } from './friend-requests.controller';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequestSchema } from './schemas/friend-request.schema';
import {UserSchema} from "../user/schemas/users.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
                { name: 'FriendRequest', schema: FriendRequestSchema },
                { name: 'User', schema: UserSchema }
            ])
    ],
    controllers: [FriendRequestsController],
    providers: [FriendRequestsService],
})
export class FriendRequestsModule {}
