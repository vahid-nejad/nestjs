import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [PropertyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
