import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {PostsModule} from "./posts/posts.module";
import {AuthModule} from "./auth/auth.module";
import {configModule} from "./configure.root";
import {UserModule} from "./user/user.module";
import {TokenModule} from "./token/token.module";
import {MailModule} from "./mail/mail.module";


@Module({
    imports: [
        configModule,
        UserModule,
        PostsModule,
        AuthModule,
        TokenModule,
        MailModule,
        MongooseModule
            .forRoot('mongodb+srv://admin:admin@cluster0.4deuyex.mongodb.net/?retryWrites=true&w=majority')]

})

export class AppModule {

}
