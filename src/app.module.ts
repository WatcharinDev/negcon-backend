import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'negcon-do-user-14756404-0.c.db.ondigitalocean.com',
      port: 25060,
      username: 'doadmin',
      password: 'AVNS_n7j_3AxWj6uCd4TqCxc',
      database: 'defaultdb',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class AppModule {}