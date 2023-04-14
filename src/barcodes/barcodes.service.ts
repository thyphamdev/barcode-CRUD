import { Injectable } from '@nestjs/common';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { UpdateBarcodeDto } from './dto/update-barcode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Barcode } from './entities/barcode.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BarcodesService {
  constructor(@InjectRepository(Barcode) private barcodeRepo: Repository<Barcode>) { }

  create(createBarcodeDto: CreateBarcodeDto) {
    return this.barcodeRepo.save(createBarcodeDto)
  }

  findAll() {
    return this.barcodeRepo.find()
  }

  findOne(id: number) {
    return this.barcodeRepo.findOne({ where: { id } })
  }

  update(id: number, updateBarcodeDto: UpdateBarcodeDto) {
    return this.barcodeRepo.createQueryBuilder()
      .update(Barcode)
      .set({
        barcode: updateBarcodeDto.barcode
      })
      .where("id = :id", { id })
      .execute()
  }

  remove(id: number) {
    return this.barcodeRepo.createQueryBuilder()
      .delete()
      .from(Barcode)
      .where("id = :id", { id })
      .execute()
  }
}
