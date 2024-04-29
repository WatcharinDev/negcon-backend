import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { user } from 'src/entities/user.entity';
import { jwtConstants } from 'src/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([user]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1 days' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
