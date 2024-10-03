import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsInt,
  IsBoolean,
  IsEnum,
  IsDate,
  IsNumber,
  IsOptional,
  Length,
  Max,
  Min,
  Matches,
} from "class-validator";
import { DeliveryStatus } from "../enums/delivery-status.enum";
import { PetStatus } from "../enums/pet-status.enum";

export class CreatePetDto {
  @ApiProperty({
    example: 1
  })
  @IsInt() 
  id: number;

  @ApiProperty({
    example: 101,
  })
  @IsInt()
  shelterId: number;

  @ApiProperty({
    example: 'PET12345',
  })
  @IsString()
  @Length(4, 20)
  @Matches(/^PET\d+$/, { message: 'petCode must start with "PET" followed by numbers' })
  petCode: string;

  @ApiProperty({
    example: 'Fluffy',
  })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({
    example: 'A friendly dog',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    example: 'Brown',
    required: false,
  })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({
    example: 'Golden Retriever',
  })
  @IsString()
  breed: string;

  @ApiProperty({
    example: 3,
    minimum: 0,
    maximum: 30,
  })
  @IsInt()
  @Min(0)
  @Max(30)
  age: number;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  species: number;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isVacinted: boolean;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isVerified: boolean;

  @ApiProperty({
    example: 'PENDING',
    enum: DeliveryStatus,
  })
  @IsEnum(DeliveryStatus)
  deliveryStatus: DeliveryStatus;

  @ApiProperty({
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isAdopted: boolean;

  @ApiProperty({
    example: 'Rescued from a busy street',
    required: false,
  })
  @IsString()
  @IsOptional()
  note?: string;

  @IsDate()
  @IsOptional()
  rescueDate: Date;

  @ApiProperty({
    example: 205,
  })
  @IsInt()
  rescueBy: number;

  @ApiProperty({
    example: 150.5,
  })
  @IsNumber()
  rescueFee: number;

  @ApiProperty({
    example: 'Central Park, New York',
  })
  @IsString()
  locationFound: string;

  @ApiProperty({
    example: 'AVAILABLE',
    enum: PetStatus,
  })
  @IsOptional()
  @IsEnum(PetStatus)
  petStatus: PetStatus;
}
