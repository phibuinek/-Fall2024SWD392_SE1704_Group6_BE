import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Shelter, ShelterSchema } from "./schemas/shelter.schema";
import { ShelterController } from "./shelter.controller";
import { SheleterService } from "./shelter.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Shelter.name, schema: ShelterSchema }])],
    controllers: [ShelterController],
    providers: [SheleterService],
})
export class ShelterModule{}
