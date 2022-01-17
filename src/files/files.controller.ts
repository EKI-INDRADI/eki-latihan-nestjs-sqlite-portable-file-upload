import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Query, Req, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFilesDto, FindFilesDto, FilesIdDto, ResponFilesDto } from './dto/create-files.dto';
import { UpdateFilesDto } from './dto/update-files.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { InjectUser } from 'src/etc/decorator/inject-user.decorator';
// import { extname } from 'path/posix'; // rename 'path/posix' to 'path'
import { extname } from 'path';
import { Request } from 'express'; //MANUAL QUERY
import { FilesManualQueryDto } from './dto/files-manual-query.dto';

@ApiTags('Files')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file_data', {
    storage: diskStorage({
      destination: './assets/files',
      filename: (req: any, file, cb) => {
        let number_user_id = Number(req.user.id)
        let eki_auto_generate = "FL-"
          + new Date().getFullYear() //+ "-"
          + ("0" + (new Date().getMonth() + 1)).slice(-2) //+ "-"
          + ("0" + new Date().getDate()).slice(-2) + "-"
          + "USR" + number_user_id.toString().padStart((String(number_user_id).length > 4) ? String(number_user_id).length : 4, '0') + "-"
          + Date.now()

        cb(null, eki_auto_generate + extname(file.originalname))
      }
    })
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateFilesDto })
  create(@InjectUser() createFilesDto: CreateFilesDto, @UploadedFile() data_multer: Express.Multer.File) {
    createFilesDto.file_data = data_multer.filename
    let generate_file_name = String(data_multer.filename).replace(extname(data_multer.filename), '')
    createFilesDto.generate_file_name = generate_file_name //files.filename // (include)
    createFilesDto.file_ext = extname(data_multer.filename) //files.mimetype
    createFilesDto.file_storage = '/assets/' + data_multer.filename
    return this.filesService.create(createFilesDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponFilesDto })
  findAll(@Query() page: FindFilesDto) {
    return this.filesService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file_data', {
    storage: diskStorage({
      destination: './assets/files',
      filename: (req: any, file, cb) => {
        let number_user_id = Number(req.user.id)
        let eki_auto_generate = "FL-"
          + new Date().getFullYear() //+ "-"
          + ("0" + (new Date().getMonth() + 1)).slice(-2) //+ "-"
          + ("0" + new Date().getDate()).slice(-2) + "-"
          + "USR" + number_user_id.toString().padStart((String(number_user_id).length > 4) ? String(number_user_id).length : 4, '0') + "-"
          + Date.now()

        cb(null, eki_auto_generate + extname(file.originalname))
      }
    })
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateFilesDto })

  update(@Param('id') id: string, @InjectUser() updateFilesDto: UpdateFilesDto, @UploadedFile() data_multer: Express.Multer.File) {
    if (data_multer) {
      updateFilesDto.file_data = data_multer.filename
      let generate_file_name = String(data_multer.filename).replace(extname(data_multer.filename), '')
      updateFilesDto.generate_file_name = generate_file_name //files.filename // (include)
      updateFilesDto.file_ext = extname(data_multer.filename) //files.mimetype
      updateFilesDto.file_storage = '/assets/' + data_multer.filename
    }
    return this.filesService.update(+id, updateFilesDto);
  }

  @Delete(':id')
  remove(@Param() id: FilesIdDto) {
    return this.filesService.remove(id.id);
  }


  @Post('/files-manual-query')
  @ApiBody({ type: FilesManualQueryDto })
  filesManualQuery(
    @Req()
    req: Request
    // ,
    // @Res()
    // res: Response,
  ): any {

    let req_body_example = {
      "condition": {
        "generate_file_name": "a"
      },
      "skip": 25,
      "limit": 10,
      "enable_count": 1,
      "enable_manual_relation_user": 1
    }


    return this.filesService.GetFiles(req.body)
  }


}
