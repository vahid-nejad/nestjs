import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';

import { ParseIdPipe } from './pipes/parseIdPipe';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import {
  CreatePropertyZodDto,
  createPropertySchema,
} from './dto/createPropertyZod.dto';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {
    // Don't create your dependecy, instead use DI in NestJS
    // this.propertyService = new PropertyService();
  }

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id, @Query('sort', ParseBoolPipe) sort) {
    return this.propertyService.findOne();
  }

  @Post()
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  // @HttpCode(202)
  @UsePipes(new ZodValidationPipe(createPropertySchema))
  create(
    @Body()
    body: CreatePropertyZodDto,
  ) {
    return this.propertyService.create();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id,
    @Body()
    body: CreatePropertyDto,
    @Headers('host') header,
  ) {
    return this.propertyService.update();
  }
}
