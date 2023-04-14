import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BarcodesService } from './barcodes.service';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { UpdateBarcodeDto } from './dto/update-barcode.dto';
import { IdParams } from './dto/id-param.dto';
import { FindAllQuery } from './dto/find-all-query.dto';
import { SuggestQuery } from './dto/suggest-query.dto';

@Controller('barcodes')
export class BarcodesController {
  constructor(private readonly barcodesService: BarcodesService) { }

  @Post()
  create(@Body() createBarcodeDto: CreateBarcodeDto) {
    return this.barcodesService.create(createBarcodeDto);
  }

  @Get()
  async findAll(@Query() query: FindAllQuery) {
    const { result, total } = await this.barcodesService.findAll(query);
    const { page, take } = query;
    const lastPage = Math.ceil(total / take);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: [...result],
      pagination: {
        items_in_current_page: result.length,
        total_items: total,
        current_page: page,
        next_page: nextPage,
        prev_page: prevPage,
        total_page: lastPage
      }
    }
  }

  @Get('suggestion')
  suggest(@Query() query: SuggestQuery) {
    const { barcode } = query
    return this.barcodesService.suggest(barcode)
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
