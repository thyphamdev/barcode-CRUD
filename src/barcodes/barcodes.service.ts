import { Injectable } from '@nestjs/common';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { UpdateBarcodeDto } from './dto/update-barcode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Barcode } from './entities/barcode.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class BarcodesService {
  esIndex = 'barcodes'

  constructor(
    @InjectRepository(Barcode) private barcodeRepo: Repository<Barcode>,
    private esClient: ElasticsearchService
  ) { }

  public async createIndex() {
    // create index if doesn't exist
    try {
      const checkIndex = await this.esClient.indices.exists({ index: this.esIndex });
      if (!checkIndex) {
        await this.esClient.indices.create({
          index: this.esIndex,
          body: {
            "settings": {
              "analysis": {
                "filter": {
                  "trigrams_filter": {
                    "type": "ngram",
                    "min_gram": 2,
                    "max_gram": 3
                  }
                },
                "analyzer": {
                  "trigrams": {
                    "type": "custom",
                    "tokenizer": "standard",
                    "filter": [
                      "lowercase",
                      "trigrams_filter"
                    ]
                  }
                }
              }
            },
            "mappings": {
              "properties": {
                "barcode": {
                  "type": "text",
                  "analyzer": "trigrams"
                }
              }
            }
          },
        })

      }
    } catch (err) {
    }
  }

  async create(createBarcodeDto: CreateBarcodeDto) {
    const barcode = await this.barcodeRepo.save(createBarcodeDto)
    await this.esClient.index({
      index: 'barcodes',
      body: {
        id: barcode.id,
        barcode: barcode.barcode,
      }
    })
    return barcode

  }

  async findAll({ page, take, filter, sort, order }: { page: number, take: number, filter: string, sort: string, order: string }) {
    const skip = (page - 1) * take;
    const query: FindManyOptions<Barcode> = {
      order: { [sort]: order },
      take,
      skip,
    }

    if (filter) {
      query.where = { barcode: Like('%' + filter + '%') }
    }

    const [result, total] = await this.barcodeRepo.findAndCount(query);

    return { result, total }
  }

  findOne(id: number) {
    return this.barcodeRepo.findOne({ where: { id } })
  }

  async update(id: number, updateBarcodeDto: UpdateBarcodeDto) {
    const updateResult = await this.barcodeRepo.createQueryBuilder()
      .update(Barcode)
      .set({
        barcode: updateBarcodeDto.barcode
      })
      .where("id = :id", { id })
      .execute()

    this.esClient.updateByQuery({
      index: 'barcodes',
      body: {
        query: {
          match: {
            id,
          }
        },
        script: {
          source: `ctx._source.barcode='${updateBarcodeDto.barcode}'`,
        },
      }
    })

    return updateResult.affected
  }

  async remove(id: number) {
    const deleteResult = await this.barcodeRepo.createQueryBuilder()
      .delete()
      .from(Barcode)
      .where("id = :id", { id })
      .execute()

    this.esClient.deleteByQuery({
      index: 'barcodes',
      body: {
        query: {
          match: {
            id,
          }
        }
      }
    })

    return deleteResult.affected
  }

  async suggest(barcode: string) {
    const result = await this.esClient.search<Barcode>({
      index: 'barcodes',
      body: {
        query: {
          match: {
            barcode: {
              query: barcode,
            }
          }
        }
      }
    })

    return {
      max_score: result.hits.max_score,
      suggestion:
        result.hits.hits.map((item) => ({
          score: item._score,
          data: { id: item._source.id, barcode: item._source.barcode }
        }))
    }
  }
}
