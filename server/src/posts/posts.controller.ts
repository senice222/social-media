import {Body, Controller, Get,  Post, UseGuards, Param, Delete, ValidationPipe, Put} from "@nestjs/common";
import {PostsService} from "./posts.service";
import {AuthGuard} from "@nestjs/passport";
import {CreatePostsDto} from "./dto/create-posts.dto";
import { CommentDto } from "../comments/dto/create-comment.dto";
import {UserId} from "../decorators/user-id.decorator";
import {CommentsService} from '../comments/comments.service';


@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService, private readonly commentsService: CommentsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getOnePost(@Param('id') id) {
        return this.commentsService.getPosts(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    createPost(@Body(ValidationPipe) body: CreatePostsDto, @UserId() id: string) {
        console.log(id)
        return this.postsService.createPost(body, id)
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete(':postId')
    deletePost(@Param('postId') postId, @UserId() id: string) {
        return this.postsService.deletePost(postId, id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/like/:postId')
    like(@Param('postId') postId, @UserId() id: string) {
        return this.postsService.like(postId, id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('addComment/:postId')
    addComment(@Param('postId') postId: string, @UserId() id, @Body() commentDto: CommentDto) {
        return this.commentsService.createComment(postId, id, commentDto)
    }
}