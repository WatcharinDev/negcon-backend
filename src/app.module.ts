import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { users } from './entities/users.entity';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'negcon-do-user-14756404-0.c.db.ondigitalocean.com',
      port: 25060,
      username: 'doadmin',
      password: 'AVNS_n7j_3AxWj6uCd4TqCxc',
      database: 'defaultdb',
      entities: [users],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}