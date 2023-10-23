import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {MessageSchema} from "./schemas/message.schema";
import {MessageController} from "./message.controller";
import {MessageService} from "./message.service";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Message', schema: MessageSchema }
        ])
    ],
    controllers: [MessageController],
    providers: [MessageService],
    exports: []
})
export class MessageModule {}
