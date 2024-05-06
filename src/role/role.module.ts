import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/constants';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { role } from 'src/entities/role.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([role]),
      JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '1 days' },
      }),
    ],
    controllers: [RoleController],
    providers: [RoleService]
  })
export class RoleModule {}
