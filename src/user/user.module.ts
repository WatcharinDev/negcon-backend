import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from 'src/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
@Module({
  imports: [
    TypeOrmModule.forFeature([users]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1 days' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }