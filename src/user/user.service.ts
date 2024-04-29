import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from 'src/entities/user.entity';
import { user_data } from 'src/models/user.dto';
import { response_data } from 'src/models/utility.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(user)
        private readonly userRepository: Repository<user>,
        private jwtService: JwtService
    ) { }
    async getProfile(code: string): Promise<response_data> {
        try {
            const response = await this.userRepository.createQueryBuilder("user")
                .select([
                    "user.id",
                    "user.code",
                    "user.profile_img",
                    "user.email",
                    "user.first_name",
                    "user.last_name",
                    "user.role_id",
                    "user.role_code",
                    "user.role_name",
                    "user.tel",
                    "user.birthday",
                    "user.introduction",
                ])
                .where("user.status = :status AND user.code = :code", { status: true, code: code })
                .getOne();
            const user: user_data = response
            return {
                statusCode: HttpStatus.OK,
                data: user,
                message: "User retrieved successfully"
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'Get user failed',
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
