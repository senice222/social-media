
import {
    ExtractJwt,
    Strategy
} from 'passport-jwt';
import {
    PassportStrategy
} from '@nestjs/passport';
import {
    Injectable, UnauthorizedException
} from '@nestjs/common';
import {UserI} from "../../user/interfaces/user.interface";
import {TokenService} from "../../token/token.service";
import {ConfigService} from '@nestjs/config';
// configService.get<string>('JWT_SECRET') 'sane4kaSnimaesh'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly tokenService: TokenService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(req, user: Partial<UserI>) {
        const token = req.headers.authorization.slice(7)
        const isTokenExists = await this.tokenService.exists(user._id, token)

        if (isTokenExists) {
            return user
        } else {
            throw new UnauthorizedException(`token isn't exists`)
        }

    }
}