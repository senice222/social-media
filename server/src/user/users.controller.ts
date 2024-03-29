import {
    Controller,
    Get,
    Param,
    UseGuards,
} from '@nestjs/common';
import {UsersService} from './users.service';
import {AuthGuard} from '@nestjs/passport';
import {UserId} from "../decorators/user-id.decorator";


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
    @Get('search/:username')
    searchUser(@Param('username') username) {
        return this.userService.searchUser(username);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getUser/:id')
    getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/getAllUserPosts/getAllUserPosts')
    getAllUserPosts(@UserId() id: string) {
        return this.userService.getAllUserPosts(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/getMe/me')
    getMe(@UserId() id: string) {
        return this.userService.getUserById(id)
    }
}