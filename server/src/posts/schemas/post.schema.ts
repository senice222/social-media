import {
    Schema,
    SchemaFactory,
    Prop,
} from "@nestjs/mongoose";
import mongoose, {
    Document,
} from 'mongoose';
import { CommentI } from "../../comments/interfaces/commentI";

export type PostDocument = Post & Document

@Schema()
export class Post {
    // @Prop({ required: true })
    title: string;

    // @Prop({ required: true })
    content: string;

    // @Prop()
    likes: string[];

    @Prop({default: []})
    comments: CommentI[];

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    ownerId: string
}

export const PostSchema = SchemaFactory.createForClass(Post);