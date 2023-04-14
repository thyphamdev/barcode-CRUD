import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BarcodesService } from './barcodes.service';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { UpdateBarcodeDto } from './dto/update-barcode.dto';
import { IdParams } from './dto/id-param.dto';

@Controller('barcodes')
export class BarcodesController {
  constructor(private readonly barcodesService: BarcodesService) { }

  @Post()
  create(@Body() createBarcodeDto: CreateBarcodeDto) {
    return this.barcodesService.create(createBarcodeDto);
  }

  @Get()
  findAll() {
    return this.barcodesService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: IdParams) {
    return this.barcodesService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params: IdParams, @Body() updateBarcodeDto: UpdateBarcodeDto) {
    return this.barcodesService.update(params.id, updateBarcodeDto);
  }

  @Delete(':id')
  remove(@Param() params: IdParams) {
    return this.barcodesService.remove(params.id);
  }
}
