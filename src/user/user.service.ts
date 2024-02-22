import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from 'src/entities/users.entity';
import { user_data, user_session, user_sign_in, user_sign_up } from 'src/models/users.dto';
import * as bcrypt from 'bcrypt';
import { access_token, response_data, response_message } from 'src/models/utility.dto';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(users)
        private readonly userRepository: Repository<users>,
        private jwtService: JwtService
    ) { }
    async SignUp(req: user_sign_up): Promise<response_message> {
        const date: Date = new Date()
        try {
            const hash = await bcrypt.hashSync(req.password, 10)
            console.log(hash)
            const user_entity = new users()
            user_entity.id=0;
            user_entity.code = uuidv4()
            user_entity.username = req.username.toLocaleLowerCase()
            user_entity.password = hash
            user_entity.first_name = req.first_name
            user_entity.last_name = req.last_name
            user_entity.birthday="2023-11-12"
            user_entity.introduction=req.introduction
            user_entity.role_id = 1
            user_entity.role_code = "CS"
            user_entity.tel = req.tel

            const result = this.userRepository.save(user_entity)
            return {
                code: 200,
                message: `User ${req.username} created successfully!`
            }

        } catch (error) {

            if (error instanceof Error) {
                throw new HttpException(
                    {
                        code: HttpStatus.BAD_REQUEST,
                        message: 'User creation failed',
                        details: error.message,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            } else {
                throw new HttpException(
                    {
                        code: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'An internal server error occurred',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }
    }
    async signIn(req: user_sign_in): Promise<user_session> {
        const user = await this.userRepository.findOneBy({ username: req.username.toLocaleLowerCase() })
        if (user && bcrypt.compare(req.password, user.password)) {
            const payload:access_token = { code: user.code, username: user.username, first_name: user.first_name, last_name: user.last_name, role_id: user.role_id ,role_code:user.role_code};
            const userResponse: user_session = {
                id: user.id,
                code: user.code,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                access_token: await this.jwtService.signAsync(payload),
                role_id: user.role_id,
                role_code: user.role_code
            }
            return userResponse;
        }

        throw new UnauthorizedException();
    }
    async finduser(code: string): Promise<response_data> {
        try {
            const queryBuilder = this.userRepository.createQueryBuilder('users').where('users.code = :code', { code: code });
            const user = await queryBuilder.getOneOrFail();
            
            
            const result: user_data = {
                id: user.id,
                code: user.code,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                role_id: user.role_id,
                role_code: user.role_code,
                tel: user.tel,
                // created_by: '',
                // created_at: undefined
            };

            return {
                code: HttpStatus.OK,
                data: result,
                count:0,
                message: "User fetch profile successfully!"
            };
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(
                    {
                        code: HttpStatus.BAD_REQUEST,
                        message: 'fetch data failed',
                        details: error.message,
                    },
                    HttpStatus.BAD_REQUEST,
                );
            } else {
                throw new HttpException(
                    {
                        code: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'An internal server error occurred',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }

    }
}
