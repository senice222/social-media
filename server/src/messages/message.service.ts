import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Message, MessageDocument} from "./schemas/message.schema";
import {SendMessageDto} from "./dto/send-message.dto";

export class MessageService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    ) {}

    async sendMessage(dto: SendMessageDto) {
        const message = await this.messageModel.create(dto)
        return await message.save()
    }

    async getMessages(conversationId: string) {
        return await this.messageModel.find({
            conversationId
        })
    }
}