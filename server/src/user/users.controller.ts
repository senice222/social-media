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
    @Get('getUser/:id')
    getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/getMe/me')
    getMe(@UserId() id: string) {
        console.log(id)
        return this.userService.getUserById(id)
    }
}