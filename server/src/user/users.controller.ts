import {
    Controller,
    Get, MaxFileSizeValidator,
    Param, ParseFilePipe, Post, UploadedFile,
    UseGuards, UseInterceptors,
} from '@nestjs/common';
import {UsersService} from './users.service';
import {AuthGuard} from '@nestjs/passport';
import {UserId} from "../decorators/user-id.decorator";
import { FileInterceptor } from '@nestjs/platform-express';
import {fileStorage} from "../auth/storage";

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':email')
    getUserByEmail(@Param('email') email) {
        return this.userService.getUserByEmail(email);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getUser/:id')
    getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/me/currentUser')
    getMe(@UserId() id: string) {
        return this.userService.getUserById(id)
    }

    @Post('/upload/userAvatar')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: fileStorage,
    }))
    uploadUserAvatar( @UploadedFile(
        new ParseFilePipe({
            validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
        }),
    ) file: Express.Multer.File) {
        return this.userService.uploadUserAvatar(file)
    }
}