import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import  {Model} from "mongoose";
import {Post, PostDocument} from "./schemas/post.schema";
import {CreatePostsDto} from "./dto/create-posts.dto";
import {User, UserDocument} from "../user/schemas/users.schema";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    )  { }



    async createPost(dto: CreatePostsDto, userId: string): Promise<Post> {
        const post = await this.postModel.create({...dto, ownerId: userId})
        const user = await this.userModel.findById(userId)

        user.createdPosts.push(post._id)

        await user.save()

        return post
    }
    async deletePost(postId: string, userId: string): Promise<Post> {
        const post = await this.postModel.findById(postId)

        if ( post.ownerId.toString() === userId.toString() ) {
            await this.postModel.findByIdAndDelete(post._id)
            await this.userModel.findByIdAndUpdate(userId, {
                $pull: {createdPosts: postId}
            })
        } else {
            throw new BadRequestException()
        }

        return post._id
    }

    async like(paramsPostId: string, userId: string) {
        try {
            const post = await this.postModel.findById(paramsPostId)

            if (!post.likes.includes(userId)) {
                await this.postModel.updateOne({_id: post._id}, {$push: {likes: userId}})
            } else {
                await this.postModel.updateOne({_id: post._id}, {$pull: {likes: userId}})
            }
            return post
        } catch (e) {
            console.log(e)
        }
    }

}