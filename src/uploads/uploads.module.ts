import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService]
})
export class UploadsModule {}
