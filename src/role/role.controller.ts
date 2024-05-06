import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { AuthGuard } from 'src/auth.guard';
import { response_data } from 'src/models/utility.dto';
import { role_form_action } from 'src/models/role.dto';

@ApiTags('Role Management')

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) { }
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create Role', description: 'create role by user' })
    @UseGuards(AuthGuard)
    @Post("/add")
    CreatePostController(@Body() req: role_form_action, @Req() request): response_data {
        return this.roleService.createRole(req, request) as any
    }
    @ApiOperation({ summary: 'Get Role', description: 'get all role by user' })
    @Get("/get/all")
    GetAllPostsController(): response_data {
        return this.roleService.getAllRole() as unknown as response_data
    }
}
