import { Module } from '@nestjs/common';
import { BulkDownloadService } from './bulk-download.service';
import { BulkDownloadResolver } from './bulk-download.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cfdi, Concepts, Receptors, Retentions, Taxes, Transmitter } from './entities';

@Module({
  providers: [BulkDownloadResolver, BulkDownloadService],
  imports: [TypeOrmModule.forFeature([Cfdi,Transmitter,Receptors,Concepts,Taxes,Retentions])]
})
export class BulkDownloadModule {}
