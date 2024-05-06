import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { role } from 'src/entities/role.entity';
import { role_form_action } from 'src/models/role.dto';
import { response_data, response_data_list } from 'src/models/utility.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(role)
        private readonly roleRepository: Repository<role>,
    ) { }


    async createRole(req: role_form_action, session: any): Promise<response_data> {
        const date: Date = new Date()
        try {
            const role_entity = new role
            role_entity.code = req.code
            role_entity.name = req.name
            role_entity.status = true
            role_entity.created_by = session.user.code
            role_entity.created_at = date
            role_entity.update_by = session.user.code
            role_entity.update_at = date
            const response = await this.roleRepository.createQueryBuilder()
                .insert()
                .into('role')
                .values(role_entity)
                .execute()
            return {
                statusCode: HttpStatus.OK,
                data: response,
                message: `Role ${req.name} created successfully!`
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
    async getAllRole(): Promise<response_data> {
        try {

            const response = await this.roleRepository.createQueryBuilder('role').select(['id', 'code', 'name'])
                .where('role.status = :status', { status: true })
                .getRawMany();
            return {
                statusCode: HttpStatus.OK,
                data: response,
                message: "Role retrieved successfully"
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.BAD_REQUEST,
                        message: 'Get all role failed',
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
