import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import {MongooseModule} from '@nestjs/mongoose';
import {PostSchema} from '../posts/schemas/post.schema';
import {UserSchema} from '../user/schemas/users.schema';
import {CommentSchema} from './schemas/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Comment', schema: CommentSchema },
    ])
  ],
  controllers: [],
  providers: [CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
