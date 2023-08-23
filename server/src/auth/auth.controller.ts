import {
    AuthService
} from './services/auth.service';
import {
    Controller,
    Post, Body, ValidationPipe, Query, Get
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import {SignInDto} from "./dto/sign-in.dto";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/signUp")
    async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto)
    }

    @Post("/signIn")
    async signIn(@Body(ValidationPipe) signInDto: SignInDto) {
        return this.authService.signIn(signInDto)
    }

    @Get("/confirm")
    async confirm(@Query(ValidationPipe) query: ConfirmAccountDto): Promise<boolean> {
        await this.authService.confirm(query.token)
        return true
    }
}