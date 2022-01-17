import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { FilesDto } from './create-files.dto';

export class UpdateFilesDto extends PartialType(FilesDto) { } 
