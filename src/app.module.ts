import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { ExistValidator } from './etc/validator/exist-validator';
import { UniqueValidator } from './etc/validator/unique-validator';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { Files } from './files/entities/files.entity';
import { PageService } from './etc/service/page/page.service';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.SQLITE_DATABASE,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [
        User, 
        Files
      ],
      synchronize: true // entity yang dibuat tablenya akan otomatis di generate
    }),
    UserModule,
    AuthModule,
    FilesModule,
    ServeStaticModule.forRoot({
      // https://github.com/nestjs/nest/blob/master/sample/24-serve-static/src/app.module.ts
      rootPath: join(__dirname, '..', 'assets' , 'files'),
      // exclude: ['/api*']


      // call image :
      // http://localhost:3000/1.png
      // http://localhost:3000/folder/2.png
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ExistValidator, UniqueValidator, PageService],
})
export class AppModule { }
