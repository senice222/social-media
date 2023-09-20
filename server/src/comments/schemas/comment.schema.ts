import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';
import { User } from "../../user/schemas/users.schema";
import { Post } from "../../posts/schemas/post.schema";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop({ required: true })
    commentText: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: string; // Автор комментария

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
    postId: string; // Пост, к которому относится комментарий

    @Prop({ default: Date.now })
    createdAt: string
}

export const CommentSchema = SchemaFactory.createForClass(Comment);