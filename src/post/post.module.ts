import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { MulterModule } from '@nestjs/platform-express';
import { PostController } from './post.controller';
import { post } from 'src/entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([post]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1 days' },
    }),
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
