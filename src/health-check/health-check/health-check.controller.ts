import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HealthCheckService } from "./health-check.service";
import { CreateHealthCheckDto } from "../dto/create-health-check.dto";

@ApiTags('Health Check')
@Controller('health-check')
export class HealthCheckController {
    constructor(private readonly healthCheckinService: HealthCheckService) { 
    }

    @Post('create')
    async createHealthCheck(@Body() createHealthCheckDto: CreateHealthCheckDto){
        return this.healthCheckinService.createHealthCheck(createHealthCheckDto);
    }
}