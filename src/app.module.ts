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
const certPath = path.join(__dirname, '../public/db-cert/ca-certificate.crt');
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../uploads'), // added ../ to get one folder back
      serveRoot: '/uploads/' //last slash was important
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db-negcon-do-user-14756404-0.c.db.ondigitalocean.com',
      port: 25060,
      username: 'doadmin',
      password: 'AVNS_-TpsaK_fAHgGsTmFQCl',
      database: 'negcon-database',
      entities: [user],
      synchronize: true,
      ssl:{
        ca: fs.readFileSync(certPath),
      }
    }),
    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
