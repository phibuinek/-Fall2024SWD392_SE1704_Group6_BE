import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { VolunteerTaskService } from './volunteer-task.service';
import { CreateVolunteerTaskDto } from './dto/create-volunteer-task.dto';
import { UpdateVolunteerTaskDto } from './dto/update-volunteer-task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('volunteer-task')
@Controller('volunteer-task')
export class VolunteerTaskController {
  constructor(private readonly volunteerTaskService: VolunteerTaskService) {}

  @Post()
  create(@Body() createVolunteerTaskDto: CreateVolunteerTaskDto) {
    return this.volunteerTaskService.create(createVolunteerTaskDto);
  }

  @Get()
  findAll() {
    return this.volunteerTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volunteerTaskService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVolunteerTaskDto: UpdateVolunteerTaskDto) {
    return this.volunteerTaskService.update(id, updateVolunteerTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volunteerTaskService.remove(id);
  }
}
