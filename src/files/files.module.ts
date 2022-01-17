import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { Files } from './entities/files.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [
    TypeOrmModule.forFeature([Files])
  ],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
