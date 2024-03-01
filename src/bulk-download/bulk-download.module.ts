import { Module } from '@nestjs/common';
import { BulkDownloadService } from './bulk-download.service';
import { BulkDownloadResolver } from './bulk-download.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Cfdi,
  Concepts,
  Digital_tax_stamp,
  IssuerPayroll,
  PaymentRelatedDocument,
  Payments,
  Payroll,
  PayrollDeduction,
  PayrollOtherPayments,
  PayrollPerceptions,
  ReceiverPayroll,
  Receptors,
  RelatedCfdi,
  TaxConcepts,
  TaxesTrasnfers,
  TaxesWithholdings,
  Transmitter,
} from './entities';

@Module({
  providers: [BulkDownloadResolver, BulkDownloadService],
  imports: [
    TypeOrmModule.forFeature([
      Cfdi,
      Concepts,
      Digital_tax_stamp,
      IssuerPayroll,
      PaymentRelatedDocument,
      Payments,
      Payroll,
      PayrollDeduction,
      PayrollOtherPayments,
      PayrollPerceptions,
      ReceiverPayroll,
      Receptors,
      RelatedCfdi,
      TaxConcepts,
      TaxesTrasnfers,
      TaxesWithholdings,
      Transmitter,
    ]),
  ],
})
export class BulkDownloadModule {}
