import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from 'src/entities/user.entity';
import { user_data, user_session, user_sign_in, user_sign_up } from 'src/models/user.dto';
import * as bcrypt from 'bcrypt';
import { access_token, reset_password, response_data, response_message } from 'src/models/utility.dto';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { role } from 'src/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import { post } from 'src/entities/post.entity';
import { decodePassword, encodePassword } from 'src/helper/bcrypr';
import { emailForm } from 'src/helper/email-form';
import { MailerService } from '@nestjs-modules/mailer';
import { temp_resetpassword } from 'src/entities/temp_resetpassword.entity';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(user)
        private readonly userRepository: Repository<user>,
        @InjectRepository(temp_resetpassword)
        private readonly temp_resetpasswordRepository: Repository<temp_resetpassword>,
        private readonly mailerService: MailerService,
        private jwtService: JwtService

    ) {

    }
    async signUp(req: user_sign_up): Promise<response_message> {
        const date: Date = new Date()
        const code = uuidv4()
        try {
            const hash = await bcrypt.hashSync(req.password, 10)
            const user_entity = new user()
            user_entity.code = code
            user_entity.email = req.email.toLocaleLowerCase()
            user_entity.password = hash
            user_entity.first_name = req.first_name
            user_entity.last_name = req.last_name
            user_entity.profile_img = req.profile_img
            user_entity.birthday = new Date(req.birthday)
            user_entity.introduction = req.introduction
            user_entity.role_id = req.role_id
            user_entity.tel = req.tel
            user_entity.status = true
            user_entity.created_by = "System"
            user_entity.created_at = date
            user_entity.update_by = "System"
            user_entity.update_at = date
            const response = await this.userRepository.save(user_entity)
            console.log('response')
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
            const user = await this.userRepository
                .createQueryBuilder('user')
                .leftJoin('role', 'r', 'r.id = user.id')
                .select([
                    "user.code AS code",
                    "user.email AS email",
                    "user.password AS password",
                    "user.first_name AS first_name",
                    "user.last_name AS last_name",
                    "user.role_id AS role_id",
                    "r.code AS role_code",
                    "r.name AS role_name",
                ])
                .where('user.email = :email', { email: req.email })
                .getRawOne()
            const match = await decodePassword(req.password, user.password)

            if (user && match) {
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

    async resetPassword(req: reset_password): Promise<response_message> {
        try {
            const user = await this.userRepository
                .createQueryBuilder('user')
                .leftJoin('role', 'r', 'r.id = user.id')
                .select([
                    "user.code AS code",
                    "user.email AS email",
                    "user.password AS password",
                    "user.first_name AS first_name",
                    "user.last_name AS last_name",
                    "user.role_id AS role_id",
                    "r.code AS role_code",
                    "r.name AS role_name",
                ])
                .where('user.email = :email', { email: req.email })
                .getRawOne()
            if (user) {

                const data_entity = new temp_resetpassword()
                data_entity.code_validate = uuidv4()
                data_entity.email = req.email
                data_entity.created_at = new Date()
                const response = await this.temp_resetpasswordRepository.save(data_entity)
                const baseUrl = process.env.REDIRECT_URL+`/reset-password/${response.code_validate}`;
                console.log('baseUrl',baseUrl)
                await this.mailerService.sendMail({
                    to: req.email,
                    from: "negcon.noreply@gmail.com",
                    subject: "เปลี่ยนรหัสผ่าน",
                    html: emailForm(req.email ?? "",baseUrl)
                })
                return {
                    statusCode: HttpStatus.OK,
                    message: `Email send to ${req.email} successfuly!`,
                };
            } else {
                return {
                    statusCode: HttpStatus.OK,
                    message: `User that the email ${req.email} is not registered in the system.`,
                };
            }


        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'Send email failed',
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
