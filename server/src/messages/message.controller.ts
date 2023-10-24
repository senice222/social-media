import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {MessageService} from "./message.service";
import {SendMessageDto} from "./dto/send-message.dto";

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Post('send')
    sendMessage(@Body() dto: SendMessageDto) {
        return this.messageService.sendMessage(dto)
    }

    @Get(':convId')
    getMessages(@Param('convId') convId: string) {
        return this.messageService.getMessages(convId)
    }

}