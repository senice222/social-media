import {
    Schema,
    SchemaFactory,
    Prop,
} from "@nestjs/mongoose";
import mongoose, {
    Document,
} from 'mongoose';
import { CommentI } from "../../comments/interfaces/commentI";
import {likes} from "../interfaces/likes";

export type PostDocument = Post & Document

@Schema()
export class Post {

    @Prop({ required: true })
    content: string;

    @Prop({default: []})
    likes: likes[];

    @Prop({default: []})
    comments: CommentI[];

    @Prop({default: []})
    urls: string[]

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    owner: string

    @Prop({ default: Date.now })
    createdAt: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);