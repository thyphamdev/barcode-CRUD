import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/env.validation.schema'
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarcodesModule } from './barcodes/barcodes.module';
import { Barcode } from './barcodes/entities/barcode.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'barcodeDB',
      entities: [Barcode],
      synchronize: true,
    }),
    BarcodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
