import {Module} from "@nestjs/common";
import {MailService} from "./mail.service";
import { MailerModule } from '@nestjs-modules/mailer';
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                transport: {
                    port: config.get('MAIL_PORT'),
                    host: config.get('MAIL_HOST'),
                    secure: true,
                    auth: {
                        user: config.get('MAIL_USER'),
                        pass: config.get('MAIL_PASSWORD'),
                    },
                },
                defaults: {
                    from: `"No Reply" <${config.get('MAIL_FROM')}>`,
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [MailService],
    exports: []
})
export class MailModule {

}