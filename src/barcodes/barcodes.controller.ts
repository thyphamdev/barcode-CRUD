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
  async update(@Param() params: IdParams, @Body() updateBarcodeDto: UpdateBarcodeDto) {
    const affected = await this.barcodesService.update(params.id, updateBarcodeDto);
    return {
      message: `${affected} barcode was updated`
    }
  }

  @Delete(':id')
  async remove(@Param() params: IdParams) {
    const affected = await this.barcodesService.remove(params.id);
    return {
      message: `${affected} barcode was deleted`
    }
  }
}
