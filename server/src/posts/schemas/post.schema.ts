import {
    Schema,
    SchemaFactory,
    Prop, InjectModel
} from "@nestjs/mongoose";
import mongoose, {
    Document, Model
} from 'mongoose';
import {User, UserDocument} from "../../user/schemas/users.schema";
import { CommentI } from "../interfaces/comment.interface";

export type PostDocument = Post & Document

@Schema()
export class Post {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop()
    likes: string[];

    @Prop({default: []})
    comments: CommentI[];

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    ownerId: mongoose.Schema.Types.ObjectId
};

export const PostSchema = SchemaFactory.createForClass(Post);