import {UsersService} from '../../user/users.service';
import {BadRequestException, Injectable, MethodNotAllowedException, UnauthorizedException} from '@nestjs/common';
import {JwtService, JwtSignOptions} from '@nestjs/jwt';
import {HashService} from './hash.service';
import {CreateUserDto} from "../dto/create-user.dto";
import {TokenService} from "../../token/token.service";
import {CreateTokenDto} from "../../token/dto/create-token.dto";
import {UserI} from "../../user/interfaces/user.interface";
import * as moment from 'moment';
import {ConfigService} from "@nestjs/config";
import {statusEnum} from "../../user/enums/status.enum";
import {MailService} from "../../mail/mail.service";
import {IReadableUser} from "../../user/interfaces/readable-user.interface";
import {ITokenPayload} from "../../token/interfaces/payload-token.interface";
import {SignInDto} from "../dto/sign-in.dto";

@Injectable()
export class AuthService {
    private readonly clientAppUrl: string;
    constructor(
                private userService: UsersService,
                private hashService: HashService,
                private tokenService: TokenService,
                private readonly configService: ConfigService,
                private jwtService: JwtService,
                private mailService: MailService
    )
    {
        this.clientAppUrl = this.configService.get<string>('FE_APP_URL')
    }

    async signUp(createUserDto: CreateUserDto, avatar: string): Promise<string> {
        try {
            const user = await this.userService.create({...createUserDto, avatar})
            await this.sendConfirmation(user)
            return 'success'
        } catch (e) {
            console.log(e)
        }
    }

    async signIn({email, password}: SignInDto): Promise<IReadableUser> {
        try {
            const user = await this.userService.getUserByEmail(email)

            if (user && (await this.hashService.comparePassword(password, user.password))) {
                if (user.status !== statusEnum.active) {
                    throw new MethodNotAllowedException()
                }

                const tokenPayload: ITokenPayload = {
                    _id: user._id,
                    status: user.status
                }

                const expireAt = moment()
                    .add(1, 'day')
                    .toISOString()

                const token = await this.generateToken(tokenPayload)

                await this.createToken({token, expireAt, uId: user._id})

                const readableUser = user.toObject() as IReadableUser
                readableUser.accessToken = token

                const {__v, password, ...editedUser} = readableUser
                return editedUser as IReadableUser
            }
            throw new BadRequestException('Invalid credentials')
        } catch (e) {
            console.log(e)
        }
    }

    async confirm(token: string): Promise<UserI> {
        try {
            const data = await this.verifyToken(token);
            const user = await this.userService.getUserById(data._id)

            if (user && user.status === statusEnum.pending) {
                user.status = statusEnum.active;
                // await this.tokenService.deleteToken(user._id, token)
                return user.save();
            }
            throw new BadRequestException('Confirmation error');
        } catch (e) {
            console.log(e)
        }
    }

    async sendConfirmation(user: UserI) {
        try {
            const expiresIn = 60 * 60 * 24

            const tokenPayload = {
                _id: user._id,
                status: user.status,
            }

            const expireAt = moment()
                .add(1, 'day')
                .toISOString()

            const token = await this.generateToken(tokenPayload, {expiresIn})
            const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`

            await this.createToken({token, uId: user._id, expireAt})
            await this.mailService.send(user, confirmLink)
        } catch (e) {
            console.log(e)
        }
    }

    private async generateToken(data, options?: JwtSignOptions): Promise<string> {
        return this.jwtService.sign(data, options)
    }

    private async verifyToken(token: string): Promise<any> {
        try {
            const data = this.jwtService.verify(token) as ITokenPayload
            const tokenExists = await this.tokenService.exists(data._id, token)

            if (tokenExists) {
                return data
            } else {
                throw new UnauthorizedException()
            }
        } catch (e) {
            throw new UnauthorizedException()
        }
    }

    private async createToken(tokenDto: CreateTokenDto) {
        const token = await this.tokenService.createToken(tokenDto)
        return token
    }

}