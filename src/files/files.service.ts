import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { PageService } from 'src/etc/service/page/page.service';
import { Connection, Repository } from 'typeorm';
import { CreateFilesDto } from './dto/create-files.dto';
import { UpdateFilesDto } from './dto/update-files.dto';
import { Files } from './entities/files.entity'; 

@Injectable()
export class FilesService extends PageService {
  constructor(
    @InjectRepository(Files) private filesRepo: Repository<Files>,
    @InjectConnection() private SqliteConnection: Connection 
  ) {
    super()
  }

  create(createFilesDto: CreateFilesDto) {
    return this.filesRepo.save(createFilesDto) 
  }

  findAll(filter) {
    return this.generatePage(filter, this.filesRepo, {
      relations: ['user']
    })
  }

  findOne(id: number) {
    return this.filesRepo.findOne(id) 
  }

  update(id: number, updateFilesDto: UpdateFilesDto) {
    updateFilesDto.id = id
    return this.filesRepo.save(updateFilesDto) 
  }

  async remove(id: number) {
    let files_result = await this.filesRepo.findOne(id) 
    return this.filesRepo.remove(files_result) 
  }


  async GetFiles(req_body: any) {

    let res_json: any = {}


    let query_params = `
    SELECT * 
    FROM files `

    if (req_body.condition.generate_file_name) {
      query_params = query_params + `WHERE `
      query_params = query_params + `generate_file_name LIKE '%${req_body.condition.generate_file_name}%'  `
    }

    let query_count_params = query_params


    if (req_body.limit) {
      query_params = query_params + ` LIMIT ${req_body.limit}  `
    }

    if (req_body.skip) {
      query_params = query_params + ` OFFSET ${req_body.skip}  `
    }


    let result = await this.SqliteConnection.query(query_params)

    if (req_body.enable_count == 1) {
      let result_count = await this.SqliteConnection.query(query_count_params)

      res_json.total = result_count.length

      if (req_body.limit) {
        res_json.page = Math.ceil(req_body.skip / req_body.limit)
        res_json.pages = Math.ceil(result_count.length / req_body.limit)
      }
    }

    if (req_body.enable_manual_relation_user == 1) {
      for (let i_a = 0; i_a < result.length; i_a++) {
        let getUser = await this.SqliteConnection.query(`SELECT * FROM user WHERE id = ${result[i_a].userId} `)

        delete getUser[0].password
        result[i_a].user = getUser[0]
        delete result[i_a].userId
      }
    }

    res_json.data = result

    return res_json
  }

}
