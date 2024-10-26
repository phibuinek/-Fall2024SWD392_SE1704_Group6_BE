// shelter.service.ts
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shelter, ShelterDocument } from './schemas/shelter.schema';
import { ShelterStatus } from './enums/shelter.enum'; // Đảm bảo import enum ShelterStatus
import { CreateShelterDto } from './dto/create-shelter.dto';
import { User, UserDocument } from 'src/auth/schemas/user.schema';
import { Role } from 'src/auth/enums/role.enum';
import { UpdateShelterDto } from './dto/update-shelter.dto';

@Injectable()
export class ShelterService implements OnModuleInit {
    constructor(@InjectModel(Shelter.name) private readonly shelterModel: Model<ShelterDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

    async onModuleInit() {
        const shelters = await this.shelterModel.find().exec();
        const manageByDefault = await this.userModel.findOne({ email: "shelterstaff@gmail.com" }).exec();
        if (shelters.length === 0) {
            await this.shelterModel.create([
                {
                    name: "Shelter A",
                    location: 'Location A',
                    managedBy: manageByDefault._id,
                    phone: '123456789',
                    email: 'shelterA@example.com',
                    quanity: 5,
                    capacity: 10,
                    availble: 5,
                    status: ShelterStatus.AVAILABLE,
                },
            ]);

            console.log('Sample shelters created!');
        } else {
            console.log('Sample shelter data already exists.');
        }
    }

    async getAllShelters(): Promise<Shelter[]> {
        return this.shelterModel.find({status: ShelterStatus.AVAILABLE}).exec();
    }

    async createShelter(createShelterDto: CreateShelterDto): Promise<Shelter> {
        const managedBy = await this.userModel.findOne({ _id: createShelterDto.managedBy, role: Role.SHELTER_STAFF });
        if (!managedBy) {
            throw new NotFoundException(`Shelter Staff account not found`);
        }
        const newShelter = new this.shelterModel({
            ...createShelterDto,
            availble: createShelterDto.capacity,
        });
        return newShelter.save();
    }

    async updateShelter(shelterId: string, updateShelterDto: UpdateShelterDto): Promise<Shelter> {
        const updateShelter = await this.shelterModel.findByIdAndUpdate(shelterId, updateShelterDto, { new: true }).exec();
        if (!updateShelter) {
            throw new NotFoundException(`Not found Shelter with id ${shelterId}`);
        }
        return updateShelter;
    }

    async deleteShelter(shelterId): Promise<Shelter> {
        const deleteShelter = await this.shelterModel.findByIdAndUpdate(shelterId,
            { status: ShelterStatus.NOT_AVAILABLE },
            { new: true }
        );
        if(!deleteShelter){
            throw new NotFoundException(`Not found shelterId with Id ${shelterId}`);
        }
        return deleteShelter;
    }
}
