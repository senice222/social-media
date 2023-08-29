import {
    AuthService
} from './services/auth.service';
import {
    Controller,
    Post, Body, ValidationPipe, Query, Get, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator
} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {ConfirmAccountDto} from './dto/confirm-account.dto';
import {SignInDto} from "./dto/sign-in.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {fileStorage} from "./storage";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post("/signUp")
    @UseInterceptors(FileInterceptor('avatar', {
        storage: fileStorage,
    }))
    async signUp(
        @UploadedFile(
            new ParseFilePipe({
                validators: [new MaxFileSizeValidator({maxSize: 1024 * 1024 * 5})],
            }),
        ) file: Express.Multer.File, @Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto, file.path)
    }

    @Post("/signIn")
    async signIn(@Body(ValidationPipe) signInDto: SignInDto) {
        return this.authService.signIn(signInDto)
    }

    @Get("/confirm")
    async confirm(@Query(ValidationPipe) query: ConfirmAccountDto): Promise<boolean> {
        console.log(query)
        await this.authService.confirm(query.token)
        return true
    }
}