import { Body, Controller, Get, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { post_form_action, post_like } from 'src/models/post.dto';
import { response_data, response_data_list, response_message } from 'src/models/utility.dto';
import { PostService } from './post.service';
import { AuthGuard } from 'src/auth.guard';
@ApiTags('Post Management')
@ApiBearerAuth()
@Controller('post')
export class PostController {
    constructor(private postService: PostService) { }


    @ApiOperation({ summary: 'Create Post', description: 'create post by user' })
    @UseGuards(AuthGuard)
    @Post("/create")
    CreatePostController(@Body() req: post_form_action, @Req() request): response_data {

        console.log("req", request.user.code)
        return this.postService.createPost(req, request) as any
    }
    @ApiOperation({ summary: 'Get Post', description: 'get all post by user' })
    @UseGuards(AuthGuard)
    @Get("/get/all")
    GetAllPostsController(@Query('page') page: number = 1, @Query('size') size: number = 10, @Req() request: any,): response_data_list {
        return this.postService.getAllPosts(page, size) as unknown as response_data_list
    }
    @ApiOperation({ summary: 'Get Post', description: 'get all post by user' })
    @UseGuards(AuthGuard)
    @Post("/like")
    LikePostsController(@Body() req: post_like, @Req() request): response_data {
        return this.postService.likePost(req, request) as unknown as response_data
    }
}
