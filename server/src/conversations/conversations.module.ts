import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConversationSchema} from "./schemas/conversation.schema";
import {ConversationsController} from "./conversations.controller";
import {ConversationsService} from "./conversations.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Conversation', schema: ConversationSchema }
        ])
    ],
    controllers: [ConversationsController],
    providers: [ConversationsService],
    exports: []
})
export class ConversationsModule {}
