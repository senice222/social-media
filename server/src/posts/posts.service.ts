import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Post, PostDocument} from "./schemas/post.schema";
import {CreatePostsDto} from "./dto/create-posts.dto";
import {User, UserDocument} from "../user/schemas/users.schema";
import { Paginated } from "./interfaces/paginated.post";
import {DateService} from "../date/date.service";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly dateService: DateService
    ) {
    }

    async getAllPosts() {
        return this.userModel.find();
    }

    async getOnePost(id: string): Promise<User> {
        return this.postModel.findById(id).populate({
            path: 'comments',
            populate: {
                path: 'userId',
                model: this.userModel,
            },
        })
    }

    async getPaginatedPosts(page: number, perPage: number): Promise<Paginated> {
        const total = await this.postModel.countDocuments().exec()
        const totalPages = Math.ceil(total / perPage)
        const skip = (page - 1) * perPage
        const posts = await this.postModel.find().skip(skip).limit(perPage).populate({
            path: 'comments',
            populate: {
                path: 'userId',
                model: this.userModel,
            }
        }).populate('owner')

        return {
          posts,
          total,
          totalPages,
        }
    }

    async createPost(dto: CreatePostsDto, userId: string, files: string[]): Promise<Post> {
        const createdAt = this.dateService.formatDate(new Date());
        const post = await this.postModel.create({...dto, owner: userId, urls: files, createdAt})
        const user = await this.userModel.findById(userId)

        user.createdPosts.push(post._id)

        await user.save()

        return post
    }

    async deletePost(postId: string, userId: string): Promise<Post> {
        const post = await this.postModel.findById(postId)

        if (post.owner.toString() === userId.toString()) {
            await this.postModel.findByIdAndDelete(post._id)
            await this.userModel.findByIdAndUpdate(userId, {
                $pull: {createdPosts: postId}
            })
        } else {
            throw new BadRequestException()
        }

        return post._id
    }

    async like(paramsPostId: string, userId: string): Promise<Post> {
        try {
            const post = await this.postModel.findById(paramsPostId)
            const isIncludes = post.likes.some(item => item.id === userId)
            if (!isIncludes) {
                await this.postModel.updateOne({_id: post._id}, {$push: {likes: {id: userId}}})
            } else {
                await this.postModel.updateOne({_id: post._id}, {$pull: {likes: {id: userId}}})
            }
            return post
        } catch (e) {
            console.log(e)
        }
    }

}