import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { user } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PostModule } from './post/post.module';
import { UploadsModule } from './uploads/uploads.module';
import { post } from './entities/post.entity';
import { UserModule } from './user/user.module';
const certPath = path.join(__dirname, '../public/db-cert/ca-certificate.crt');
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../uploads'), // added ../ to get one folder back
      serveRoot: '/uploads/' //last slash was important
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOSTNAME,
      port: parseInt(process.env.DATABASE_PORT) || 25060,
      username: process.env.PDATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [user,post],
      synchronize: true,
      ssl:{
        ca: fs.readFileSync(certPath),
      }
    }),
    AuthModule,
    PostModule,
    UploadsModule,
    UserModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
