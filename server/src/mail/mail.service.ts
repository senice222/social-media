import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import {UserI} from "../user/interfaces/user.interface";

@Injectable()
export class MailService {
    constructor(
        private readonly configService: ConfigService,
        private mailerService: MailerService
    ) {

    }

    async send(user: UserI, url: string) {
        await this.mailerService.sendMail({
            to: user.email,
            from: `"Support Team" ${this.configService.get<string>('MAIL_FROM')}`,
            subject: 'Welcome to my Social-Media App! Confirm your Email',
            html: `
                <p>Hey ${user.username}</p>
                <p>Please click below to confirm your email</p>
                <p>
                    <a href=${url}>Confirm</a>
                </p>
                
                <p>If you did not request this email you can safely ignore it.</p>
            `,
        });
    }
}