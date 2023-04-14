import { Module } from '@nestjs/common';
import { BarcodesService } from './barcodes.service';
import { BarcodesController } from './barcodes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barcode } from './entities/barcode.entity';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Barcode]),
  ElasticsearchModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      node: configService.get('ELASTICSEARCH_NODE'),
      auth: {
        username: configService.get('ELASTICSEARCH_USERNAME'),
        password: configService.get('ELASTICSEARCH_PASSWORD'),
      }
    }),
    inject: [ConfigService],
  }),],
  controllers: [BarcodesController],
  providers: [BarcodesService]
})
export class BarcodesModule {
  constructor(private readonly barcodeService: BarcodesService) { }
  public async onModuleInit() {
    await this.barcodeService.createIndex();
  }
}
