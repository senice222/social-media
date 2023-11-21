import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {PostsModule} from "./posts/posts.module";
import {AuthModule} from "./auth/auth.module";
import {configModule} from "./configure.root";
import {UserModule} from "./user/user.module";
import {TokenModule} from "./token/token.module";
import {MailModule} from "./mail/mail.module";
import { CommentsModule } from './comments/comments.module';
import {DateModule} from "./date/date.module";
import {FriendRequestsModule} from "./friends/friend-requests.module";
import {ConversationsModule} from "./conversations/conversations.module";
import {MessageModule} from "./messages/message.module";
// import { SocketModule } from './socket/socket.module';

@Module({
    imports: [
        configModule,
        UserModule,
        PostsModule,
        AuthModule,
        TokenModule,
        MailModule,
        FriendRequestsModule,
        MongooseModule
            .forRoot('mongodb+srv://admin:admin@cluster0.4deuyex.mongodb.net/?retryWrites=true&w=majority'),
        CommentsModule,
        DateModule,
        ConversationsModule,
        MessageModule,
        // SocketModule
    ]

})

export class AppModule {

}
