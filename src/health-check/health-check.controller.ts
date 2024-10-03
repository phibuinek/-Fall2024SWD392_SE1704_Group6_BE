import { Body, Controller, Param, Post, Req, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HealthCheckService } from "./health-check.service";
import { CreateHealthCheckDto } from "./dto/create-health-check.dto";

@ApiTags('Health Check')
@Controller('health-check')
export class HealthCheckController {
    constructor(private readonly healthCheckinService: HealthCheckService) { 
    }

    @Post('create/:petId')
    async createHealthCheck(@Param("petId") petId: string, @Body() createHealthCheckDto: CreateHealthCheckDto, @Req() req: any){
        const userId = req.user.id;
        createHealthCheckDto.checkingBy = userId;
        createHealthCheckDto.petId = petId;
        return this.healthCheckinService.createHealthCheck(createHealthCheckDto);
    }
}