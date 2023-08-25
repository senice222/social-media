import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator'
import {Post} from "../posts/schemas/post.schema";

export class UserEntity {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3)
    readonly username: string;

    @IsNotEmpty()
    @Length(6)
    @IsString()
    readonly password: string;

    readonly avatar: string;
    readonly status: string;
    readonly createdPosts: Post[];
    readonly chats: [];
}