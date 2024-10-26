import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
import { ShelterStatus } from "../enums/shelter.enum";

export class UpdateShelterDto{
    @IsNotEmpty()
    @ApiProperty({
        example: "Shelter Sieu Bu V1",
    })
    name: string;

    @IsNotEmpty()
    @ApiProperty({
        example: "Dia chi ne V1"
    })
    location: string;

    @IsNotEmpty()
    @ApiProperty({
        example: "0909123455V1"
    })
    phone: string;

    @IsNotEmpty()
    @ApiProperty({
        example: "shelter@gmail.com_udpate"
    })
    email: string;

    @IsNotEmpty()
    @ApiProperty({
        example: 10,
    })
    capacity: number;

}