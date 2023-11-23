import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ChatGateway } from './chat/chat.gateway';
import { CommentsModule } from './comments/comments.module';
import { configModule } from './configure.root';
import { ConversationsModule } from './conversations/conversations.module';
import { DateModule } from './date/date.module';
import { FriendRequestsModule } from './friends/friend-requests.module';
import { MailModule } from './mail/mail.module';
import { MessageModule } from './messages/message.module';
import { PostsModule } from './posts/posts.module';
// import { SocketModule } from './socket/socket.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    configModule,
    UserModule,
    PostsModule,
    AuthModule,
    TokenModule,
    MailModule,
    FriendRequestsModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.4deuyex.mongodb.net/?retryWrites=true&w=majority',
    ),
    CommentsModule,
    DateModule,
    ConversationsModule,
    MessageModule,
  ],
  providers: [ChatGateway],
})
export class AppModule {}
