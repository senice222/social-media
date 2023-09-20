import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import {MongooseModule} from '@nestjs/mongoose';
import {PostSchema} from '../posts/schemas/post.schema';
import {UserSchema} from '../user/schemas/users.schema';
import {CommentSchema} from './schemas/comment.schema';
import {DateService} from "../date/date.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Comment', schema: CommentSchema },
    ])
  ],
  controllers: [],
  providers: [CommentsService, DateService],
  exports: [CommentsService]
})
export class CommentsModule {}
