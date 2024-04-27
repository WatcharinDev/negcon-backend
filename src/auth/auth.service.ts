import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from 'src/entities/user.entity';
import { user_data, user_session, user_sign_in, user_sign_up } from 'src/models/user.dto';
import * as bcrypt from 'bcrypt';
import { access_token, response_data, response_message } from 'src/models/utility.dto';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(user)
        private readonly userRepository: Repository<user>,
        private jwtService: JwtService
    ) { }
    async signUp(req: user_sign_up): Promise<response_message> {
        const date: Date = new Date()
        try {
            const hash = await bcrypt.hashSync(req.password, 10)
            const user_entity = new user()
            user_entity.code = uuidv4()
            user_entity.email = req.email.toLocaleLowerCase()
            user_entity.password = hash
            user_entity.first_name = req.first_name
            user_entity.last_name = req.last_name
            user_entity.profile_img = req.profile_img ? req.profile_img : ""
            user_entity.birthday = new Date(req.birthday)
            user_entity.introduction = req.introduction
            user_entity.role_id = 1
            user_entity.role_code = req.role_code
            user_entity.role_name = "Super Admin"
            user_entity.tel = req.tel
            user_entity.status = true
            user_entity.created_by = "System"
            user_entity.created_at = date
            user_entity.update_by = "System"
            user_entity.update_at = date

            const response = await this.userRepository.save(user_entity)
            if (response.id) {
                return {
                    statusCode: HttpStatus.OK,
                    message: `User ${req.email} created successfully!`
                }

            } else {
                return {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: `User creation failed`
                }

            }

        } catch (error) {

            if (error instanceof Error) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'User creation failed',
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
    async signIn(req: user_sign_in): Promise<response_data> {
        try {
            const user = await this.userRepository.findOneBy({ email: req.email.toLocaleLowerCase(), status: true })
            if (user && bcrypt.compare(req.password, user.password)) {
                const payload: access_token = {
                    code: user.code,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    role_id: user.role_id,
                    role_code: user.role_code,
                    role_name: user.role_name
                };
                const userResponse: user_session = {
                    id: user.id,
                    code: user.code,
                    profile_img: user.profile_img,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    access_token: await this.jwtService.signAsync(payload),
                    role_id: user.role_id,
                    role_code: user.role_code,
                    role_name: user.role_name
                }
                return {
                    statusCode: HttpStatus.OK,
                    data: userResponse,
                    message: "Login successfully!",
                };
            } else {
                throw new UnauthorizedException();
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'User creation failed',
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
