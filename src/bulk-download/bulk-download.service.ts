import { Injectable } from '@nestjs/common';
import { CreateBulkDownloadInput } from './dto/create-bulk-download.input';
import { UpdateBulkDownloadInput } from './dto/update-bulk-download.input';

@Injectable()
export class BulkDownloadService {
  create(createBulkDownloadInput: CreateBulkDownloadInput) {
    return 'This action adds a new bulkDownload';
  }

  findAll() {
    return `This action returns all bulkDownload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bulkDownload`;
  }

  update(id: number, updateBulkDownloadInput: UpdateBulkDownloadInput) {
    return `This action updates a #${id} bulkDownload`;
  }

  remove(id: number) {
    return `This action removes a #${id} bulkDownload`;
  }
}
