import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { users } from './entities/users.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'negcon-db-do-user-14756404-0.c.db.ondigitalocean.com',
      port: 25060,
      username: 'doadmin',
      password: 'AVNS_DuIfEWu-vtO1rn0vy5r',
      database: 'defaultdb',
      entities: [users],
      synchronize: true,
      ssl: {
        ca: process.env.SSL_CERT,
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// username = doadmin
// password = AVNS_DuIfEWu-vtO1rn0vy5r
// host = negcon-db-do-user-14756404-0.c.db.ondigitalocean.com
// port = 25060
// database = defaultdb
// sslmode = require