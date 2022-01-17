import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsObject } from "class-validator"

export class FilesManualQueryDto {

    @ApiProperty({ required: true})
    @IsObject()
    condition: {
        generate_file_name: string
    }

    @ApiProperty({ required: false, default: 0 })
    @IsNumber()
    skip: number

    @ApiProperty({ required: false, default: 10 })
    @IsNumber()
    limit: number

    @ApiProperty({ required: false, default: 1})
    @IsNumber()
    enable_count: number

    @ApiProperty({ required: false, default: 1 })
    @IsNumber()
    enable_manual_relation_user: number

}