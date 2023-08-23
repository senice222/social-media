import {Module} from '@nestjs/common';
import {UsersService} from '../user/users.service';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from '../user/schemas/users.schema';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {jwtConstants} from '../auth/constants';
import {HashService} from '../auth/services/hash.service';
import {AuthService} from '../auth/services/auth.service';
import {JwtStrategy} from '../auth/strategys/jwt.strategy';
import {AuthController} from "./auth.controller";
import {UsersController} from "../user/users.controller";
import {PassportModule} from "@nestjs/passport";
import {TokenService} from "../token/token.service";
import {Token, TokenSchema} from "../token/schemas/token.schema";
import {configModule} from "../configure.root";
import {MailModule} from "../mail/mail.module";
import {MailService} from "../mail/mail.service";
import * as process from "process";

@Module({
    imports: [
        configModule,
        MailModule,
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }]),
        MongooseModule.forFeature([{
            name: Token.name,
            schema: TokenSchema
        }]),
        PassportModule.register({ defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '30d'
            },
        }),
    ],
    controllers: [AuthController],
    providers: [UsersService, HashService, AuthService, TokenService, JwtStrategy, MailService],
    exports: [TokenService]
})
export class AuthModule { }