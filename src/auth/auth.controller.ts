import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { user_session, user_sign_in, user_sign_up } from 'src/models/user.dto';
import { response_message } from 'src/models/utility.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @ApiOperation({ summary: 'Create User', description: 'Signup user biddy' })
    @Post("/signup")
    SignUpController(@Body() req: user_sign_up): response_message {
        console.log(req)
        return this.authService.signUp(req) as any
    }

    // @ApiOperation({ summary: 'Signin', description: 'Signin user biddy' })
    // @Post('/signin')
    // async SignInController(@Body() req: user_sign_in): Promise<user_session | response_message> {
    //     return await this.authService.signIn(req) as user_session | response_message
    // }
}
