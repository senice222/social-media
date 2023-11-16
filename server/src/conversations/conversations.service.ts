import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Conversation, ConversationDocument} from "./schemas/conversation.schema";
import {Injectable} from "@nestjs/common";
import {CreateConversationDto} from "./dto/create-conversation.dto";

@Injectable()
export class ConversationsService {
    constructor(
        @InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>,
    ) {}


    async createConversation(dto: CreateConversationDto) {
        const newConversation = await this.conversationModel.create({members: [dto.senderId, dto.receiverId]})
        return newConversation.save()
    }

    async getUserConversation(id: string) {
        return this.conversationModel.find({
            members: {$in: [id]}
        });
    }

    async getUsersConversation(firstUserId: string, secondUserId: string) {
        return await this.conversationModel.findOne({
            members: {$all: [firstUserId, secondUserId]}
        })
    }

}