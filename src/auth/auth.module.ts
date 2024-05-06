import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { AuthController } from './auth.controller';
import { role } from 'src/entities/role.entity';
import { post } from 'src/entities/post.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { temp_resetpassword } from 'src/entities/temp_resetpassword.entity';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: "negcon.noreply@gmail.com",
          pass: "pkij balt oswg rldz"
        }
      }
    }),
    TypeOrmModule.forFeature([user, post,temp_resetpassword]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1 days' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
