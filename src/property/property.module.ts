import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';

@Module({
  controllers: [PropertyController]
})
export class PropertyModule {}
