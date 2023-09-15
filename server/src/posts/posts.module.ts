import {Module} from "@nestjs/common";
import {PostsService} from "./posts.service";
import {PostsController} from "./posts.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Post, PostSchema} from "./schemas/post.schema";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constants";
import {User, UserSchema} from "../user/schemas/users.schema";
import {CommentsModule} from "../comments/comments.module";
import {DateService} from "../date/date.service";

@Module({
    imports: [
        CommentsModule,
        MongooseModule.forFeature([
            { name: 'Post', schema: PostSchema },
            { name: 'User', schema: UserSchema },
        ]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '30d'
            },
        }),
    ],
    providers: [PostsService, DateService],
    controllers: [PostsController]
})
export class PostsModule { }