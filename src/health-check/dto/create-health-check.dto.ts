import { IsBoolean, IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";  // Import decorator ApiProperty
import { HealthStatus } from "../enums/health-status.enum";
import { CheckingType } from "../enums/checking-type.enum";

export class CreateHealthCheckDto {
  
  @IsString()
  @IsOptional()
  petId: string;

  @ApiProperty({ enum: HealthStatus, example: HealthStatus.HEALTHY })
  @IsEnum(HealthStatus)
  @IsNotEmpty()
  healthStatus: HealthStatus;

  @ApiProperty({ example: "Pet is in good condition" })
  @IsString()
  healthStatusDescription: string;
  
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  note: string;

  @ApiProperty({ example: 5.2 })
  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @ApiProperty({ example: 37.5 })
  @IsNumber()
  @IsNotEmpty()
  temperature: number;

//   @ApiProperty({ example: "2024-10-01T00:00:00Z" })
//   @IsDate()
//   @IsOptional()
//   checkingDate: Date;

  @IsMongoId() 
  @IsNotEmpty()
  @IsOptional()
  checkingBy: string;

  @IsEnum(CheckingType)
  @IsOptional()
  checkingType: CheckingType;

  @ApiProperty({ example: false })
  @IsBoolean()
  isOld: boolean;
}
