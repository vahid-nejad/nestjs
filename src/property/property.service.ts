import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) private propertyRepo: Repository<Property>,
  ) {}
  async findOne(id: number) {
    const property = await this.propertyRepo.findOne({
      where: {
        id,
      },
    });

    if (!property) throw new NotFoundException();
    return property;
  }
  async findAll() {
    return await this.propertyRepo.find();
  }
  async create(dto: CreatePropertyDto) {
    return await this.propertyRepo.save(dto);
  }
  async update(id: number, dto: UpdatePropertyDto) {
    return await this.propertyRepo.update({ id }, dto);
  }
  async delete(id: number) {
    return await this.propertyRepo.delete({
      id,
    });
  }
}
