import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserIdDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt.guard';

@ApiTags('User') // AUTO GENERATE OPEN API SWAGGER
// url = http://localhost
// + 
// src\main.ts
// url = http://localhost:3000
// +
// ini aktifkan Bearer Auth untuk seluruh routes controller user pada swagger
// ini aktifkan Bearer Auth untuk seluruh routes controller user (membutuhkan header Authorization : Bearer <token>)
@Controller('user')
// url = http://localhost:3000/user

export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) { // pada saat generate end point Y sudah automatic ter set DTO
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param() get_UserIdDto: UserIdDto) {
    return this.userService.remove(get_UserIdDto.id);
  }
}
