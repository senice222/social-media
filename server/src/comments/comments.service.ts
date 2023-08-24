import { Injectable } from '@nestjs/common';
import mongoose, {Model} from 'mongoose';
import {User, UserDocument} from '../user/schemas/users.schema';
import {InjectModel} from '@nestjs/mongoose';
import {Post, PostDocument} from '../posts/schemas/post.schema';
import {Comment, CommentDocument} from './schemas/comment.schema';
import {CommentDto} from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
      @InjectModel(Post.name) private postModel: Model<PostDocument>,
      @InjectModel(User.name) private userModel: Model<UserDocument>,
      @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
  ) {}
  async createComment(postId: string, ownerId: string, commentDto: CommentDto): Promise<Post> {
    // Находим пост, к которому добавляем комментарий
    const post = await this.postModel.findById(postId);

    if (!post) {
      throw new Error('Пост не найден');
    }

    // Находим пользователя, который создает комментарий
    const user = await this.userModel.findById(ownerId);

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    // Создаем новый комментарий
    const newComment = new this.commentModel({
      commentText: commentDto.commentText,
      userId: user._id,
      postId: post._id,
    });
    console.log(newComment)
    // Сохраняем комментарий
    await newComment.save();

    // Добавляем комментарий к посту
    post.comments.push(newComment);

    // Сохраняем обновленный пост
    await post.save();
    return post;
  }
}
