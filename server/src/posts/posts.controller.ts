import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    Param,
    Delete,
    ValidationPipe,
    Put,
    UseInterceptors, ParseFilePipe, MaxFileSizeValidator, UploadedFiles
} from "@nestjs/common";
import {PostsService} from "./posts.service";
import {AuthGuard} from "@nestjs/passport";
import {CreatePostsDto} from "./dto/create-posts.dto";
import {CommentDto} from "../comments/dto/create-comment.dto";
import {UserId} from "../decorators/user-id.decorator";
import {CommentsService} from '../comments/comments.service';
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {fileStorage} from "../auth/storage";


@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService, private readonly commentsService: CommentsService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('getOnePost/:id')
    getOnePost(@Param('id') id) {
        return this.postsService.getOnePost(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('')
    getAllPosts() {
        return this.postsService.getAllPosts()
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    @UseInterceptors(FilesInterceptor('avatar', 5, {
        storage: fileStorage,
    }))
    createPost(
        @UploadedFiles() files: Express.Multer.File[], // Remove ParseFilePipe from here
        @Body(ValidationPipe) body: CreatePostsDto,
        @UserId() id: string
    ) {
        const fileList = files.map(item => item.path)
        return this.postsService.createPost(body, id, fileList);
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