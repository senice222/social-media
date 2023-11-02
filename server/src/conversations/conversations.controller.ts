import {Body, Controller, Get, Param, Post, UseGuards, ValidationPipe} from "@nestjs/common";
import {ConversationsService} from "./conversations.service";
import {CreateConversationDto} from "./dto/create-conversation.dto";
import {UserId} from "../decorators/user-id.decorator";
import {AuthGuard} from "@nestjs/passport";

@Controller('conversations')
export class ConversationsController {
    constructor(private readonly conversationsService: ConversationsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    createConversation(@Body(ValidationPipe) dto: CreateConversationDto) {
        return this.conversationsService.createConversation(dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getUserConversations(@UserId() id: string) {
        return this.conversationsService.getUserConversation(id)
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get('find/:firstUserId/:secondUserId')
    getUsersConversation(@Param('firstUserId') firstUserId: string, @Param('secondUserId') secondUserId: string) {
        return this.conversationsService.getUsersConversation(firstUserId, secondUserId)
    }
}