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
} from "class-validator";

// Định nghĩa Enum cho DeliveryStatus
export enum DeliveryStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

// Định nghĩa Enum cho PetStatus
export enum PetStatus {
  AVAILABLE = "AVAILABLE",
  ADOPTED = "ADOPTED",
  LOST = "LOST",
}

export class CreatePetDto {
  @IsInt()
  id: number;

  @IsInt()
  shelterId: number;

  @IsString()
  @Length(1, 20)
  petCode: string;

  @IsString()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsOptional() // Cho phép thuộc tính này không bắt buộc
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  breed: string;

  @IsInt()
  @Min(0)
  @Max(30)
  age: number;

  @IsInt()
  species: number;

  @IsBoolean()
  isVacinted: boolean;

  @IsBoolean()
  isVerified: boolean;

  @IsEnum(DeliveryStatus)
  deliveryStatus: DeliveryStatus;

  @IsBoolean()
  isAdopted: boolean;

  @IsString()
  @IsOptional()
  note?: string;

  @IsDate()
  rescueDate: Date;

  @IsInt()
  rescueBy: number;

  @IsNumber()
  rescueFee: number;

  @IsString()
  locationFound: string;

  @IsEnum(PetStatus)
  petStatus: PetStatus;
}
