import { Body, Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth.guard';
import { response_data } from 'src/models/utility.dto';
@ApiTags('User Management')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @ApiOperation({ summary: 'Get Profile' })
    @UseGuards(AuthGuard)
    @Get("/profile")
    GetProfileController(@Req() request): response_data {
        return this.userService.getProfile(request.user.code) as any
    }

    @ApiOperation({ summary: 'Get User' })
    @UseGuards(AuthGuard)
    @Get("/user")
    GetUserController(@Query('code') code: string): response_data {
        return this.userService.getProfile(code) as any
    }
}
