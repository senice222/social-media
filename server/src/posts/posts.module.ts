import {Module} from "@nestjs/common";
import {PostsService} from "./posts.service";
import {PostsController} from "./posts.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Post, PostSchema} from "./schemas/post.schema";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constants";
import {User, UserSchema} from "../user/schemas/users.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Post.name,
            schema: PostSchema
        }]),
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '30d'
            },
        }),
    ],
    providers: [PostsService],
    controllers: [PostsController]
})
export class PostsModule { }