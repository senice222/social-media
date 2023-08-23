import {Document} from "mongoose";
import {Post} from "../../posts/schemas/post.schema";


export interface UserI extends Document {
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly chats: [];
    readonly avatar: string;
    readonly createdPosts: Post[];
    status: string;
}