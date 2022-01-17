import { ApiHideProperty, ApiProperty, OmitType, PickType } from "@nestjs/swagger"
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator"
import { PageRequestDto, PageResponseDto } from "src/etc/dto/page-dto"
import { IsExist } from "src/etc/validator/exist-validator"
import { IsUnique } from "src/etc/validator/unique-validator"
import { UserDto } from "src/user/dto/create-user.dto"
import { Files } from "../entities/files.entity"

export class FilesDto {
    @ApiProperty()
    @IsExist([Files, 'id'])
    @IsNumber()
    id: number

    @ApiHideProperty()
    // @ApiProperty()
    @IsUnique([Files, 'generate_file_name'])
    @IsString()
    // @IsNotEmpty()
    @IsOptional()
    generate_file_name: string

    @ApiHideProperty()
    @IsString()
    @IsOptional()
    file_ext: string

    @ApiHideProperty()
    @IsString()
    @IsOptional()
    file_storage: string

    @ApiProperty({ format: 'binary' })
    @IsOptional()
    file_data: string

    @ApiHideProperty()
    @IsObject()
    user: UserDto


}
export class CreateFilesDto extends OmitType(FilesDto, ['id']) { }
export class FilesIdDto extends PickType(FilesDto, ['id']) { }

export class FindFilesDto extends PageRequestDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    generate_file_name: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    file_ext: string

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    file_storage: number

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    file_data: number
}

export class ResponFilesDto extends PageResponseDto {
    @ApiProperty({ type: [FilesDto] })
    data: FilesDto[]
}
