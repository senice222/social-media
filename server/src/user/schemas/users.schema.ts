import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from 'mongoose';
import {Post} from "../../posts/schemas/post.schema";
import {statusEnum} from "../enums/status.enum";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    username: string;

    @Prop({required: true})
    password: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]})
    createdPosts: Post[];

    @Prop({type: String, enum: statusEnum, default: statusEnum.pending})
    status: statusEnum

    @Prop({required: true, type: String})
    avatar: string

    @Prop()
    chats: [];
};

export const UserSchema = SchemaFactory.createForClass(User);