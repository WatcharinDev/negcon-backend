import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { response_data, response_message } from 'src/models/utility.dto';
import { user_session, user_sign_in, user_sign_up } from 'src/models/users.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth.guard';
@ApiTags('User Management')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @ApiOperation({ summary: 'Create User', description: 'Signup user biddy' })
    @Post("/signup")
    SignUp(@Body() req: user_sign_up): response_message {
        return this.userService.SignUp(req) as any
    }

    @ApiOperation({ summary: 'Signin', description: 'Signin user biddy' })

    @Post('/signin')
    async SignIn(@Body() req: user_sign_in): Promise<user_session> {
        return await this.userService.signIn(req)
    }
    @UseGuards(AuthGuard)
    @Get('/profile')
    async getUserProfile(@Req() request): Promise<response_data> {
        const code = request.user.code;
        return await this.userService.finduser(code)
    }
}
