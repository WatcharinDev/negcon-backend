import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { post } from 'src/entities/post.entity';
import { post_form_action, post_like } from 'src/models/post.dto';
import { response_data, response_data_list } from 'src/models/utility.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(post)
        private readonly postRepository: Repository<post>,
    ) { }


    async createPost(req: post_form_action, session: any): Promise<response_data> {
        const date: Date = new Date()
        try {
            const post_entity = new post
            post_entity.user_code = session.user.code
            post_entity.content = req.content
            post_entity.images = req.images
            post_entity.likes = []
            post_entity.status = true
            post_entity.created_by = session.user.code
            post_entity.created_at = date
            post_entity.update_by = session.user.code
            post_entity.update_at = date
            const response = this.postRepository.createQueryBuilder()
                .insert()
                .into('post')
                .values(post_entity)
                .execute()
            console.log('post_entity', response)
            return {
                statusCode: HttpStatus.OK,
                data: response,
                message: `Time ${date} Post  created successfully!`
            }

        } catch (error) {

            if (error instanceof Error) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'Post creation failed',
                        details: error.message,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            } else {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'An internal server error occurred',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }


    async getAllPosts(page: number | string, size: number | string): Promise<response_data_list> {
        try {
            const skip = (parseInt(page.toString()) - 1) * parseInt(size.toString());
            const response = await this.postRepository.createQueryBuilder('post')
                .leftJoin('user', 'u', 'u.code = post.user_code')
                .select([
                    'post.id AS id',
                    'post.content AS post_content',
                    'post.images AS post_images',
                    'post.created_at AS post_created_at',
                    'post.likes AS post_likes',
                    'u.id AS user_id',
                    'u.email AS email',
                    'u.first_name AS first_name',
                    'u.last_name AS last_name',
                    'u.profile_img AS profile_img',

                 
                ])
                .where('post.status = :status', { status: true })
                .orderBy('post.created_at', 'DESC')
                .skip(skip)
                .take(size as number)
                .getRawMany();
            return {
                statusCode: HttpStatus.OK,
                data: response,
                count: response.length,
                page: page as number,
                size: size as number,
                message: "Posts retrieved successfully"
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'Get all post failed',
                        details: error.message,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            } else {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'An internal server error occurred',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }

    async likePost(data: post_like, session: any): Promise<response_data> {

        try {
            let likes = data.post_likes
            if (data.post_likes.find((i) => i === session.user.code)) {
                likes = data.post_likes.filter((i) => i !== session.user.code)
            } else {
                likes.push(session.user.code)
            }
            const response = await this.postRepository.createQueryBuilder("post").update('post')
                .set({ likes: likes })
                .where("id = :id", { id: data.post_id })
                .execute()
            console.log('response', response)
            return {
                statusCode: HttpStatus.OK,
                data: response,
                message: "Liked post successfully"
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'Get all post failed',
                        details: error.message,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            } else {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'An internal server error occurred',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }


    async getUserPosts(page: number | string, size: number | string, code: string): Promise<response_data_list> {
        try {
            const skip = (parseInt(page.toString()) - 1) * parseInt(size.toString());
            const response = await this.postRepository
            .createQueryBuilder("post")
            .leftJoin('user', 'u', 'u.code = post.user_code')
            .select([
                'post.id AS id',
                'post.content AS post_content',
                'post.images AS post_images',
                'post.created_at AS post_created_at',
                'post.likes AS post_likes',
                'u.id AS user_id',
                'u.email AS email',
                'u.first_name AS first_name',
                'u.last_name AS last_name',
                'u.profile_img AS profile_img',
             
            ])
            .where("post.status = :status AND post.code = :code", { status: true, code: code }).skip(skip).take(size as number).orderBy('post.created_at', 'DESC').getRawMany()
            return {
                statusCode: HttpStatus.OK,
                data: response,
                count: response.length,
                page: page as number,
                size: size as number,
                message: "Posts retrieved successfully"
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'Get all post failed',
                        details: error.message,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            } else {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'An internal server error occurred',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }
}
