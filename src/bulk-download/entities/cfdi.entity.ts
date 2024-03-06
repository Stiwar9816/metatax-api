import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Concepts,
  Digital_tax_stamp,
  Payments,
  Payroll,
  Receptors,
  RelatedCfdi,
  TaxesTrasnfers,
  TaxesWithholdings,
  Transmitter,
} from './index';

@Entity({ name: 'cfdis' })
@ObjectType()
export class Cfdi {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, {
    description: 'Id UUID of digital tax stamping',
  })
  id: string;

  @Column('text', { unique: true })
  @Field(() => String, {
    description: '',
  })
  certificate: string;

  @Column('int')
  @Field(() => Int, {
    description:
      'Expresa si el comprobante ampara una operación de exportación.',
  })
  exportation: number;

  @Column('date')
  @Field(() => Date, {
    description:
      'Fecha y hora de expedición del CFDI. Debe corresponder con la hora local donde se expide el comprobante.',
  })
  date: Date;

  @Column('text')
  @Field(() => String, {
    description: `Clave del método de pago que aplica para este comprobante fiscal digital por Internet, conforme al Artículo 29-A
    fracción VII incisos a y b del CFF.`,
  })
  payment_method: string;

  @Column('text', { unique: true })
  @Field(() => String, {
    description:
      'Folio del comprobante para control interno del contribuyente, acepta una cadena de caracteres.',
  })
  folio: string;

  @Column('text')
  @Field(() => String, {
    description:
      'Clave de la forma de pago de los bienes o servicios amparados por el comprobante.',
  })
  payment_form: string;

  @Column('text')
  @Field(() => String, {
    description:
      'Código postal del lugar de expedición del comprobante (domicilio de la matriz o de la sucursal).',
  })
  place_of_expedition: string;

  @Column('text')
  @Field(() => String, {
    description: 'Currency type',
  })
  currency: string;

  @Column('bigint', { unique: true })
  @Field(() => Float, {
    description: 'Certificate number of CFDI',
  })
  certificate_number: number;

  @Column('text', { unique: true })
  @Field(() => String, {
    description: '',
  })
  stamp: string;

  @Column('text')
  @Field(() => String, {
    description:
      'Serie para control interno del contribuyente. Este atributo acepta una cadena de caracteres.',
  })
  series: string;

  @Column('text')
  @Field(() => String, {
    description: '',
  })
  exchange_type: string;

  //TODO: hacer un enum para validar los valores de los campos (I,E,T,P,N)
  @Column('text')
  @Field(() => String, {
    description: 'Clave del efecto del CFDI para el contribuyente emisor.',
  })
  proof_type: string;

  @Column('float4')
  @Field(() => Float, {
    description: 'subtotal CFDI',
  })
  subtotal: number;

  @Column('float4')
  @Field(() => Float, {
    description: 'Total CDFI invoice amount',
  })
  total: number;

  @Column('float')
  @Field(() => Float, {
    description:
      'Versión del estándar bajo el que se encuentra expresado el comprobante.',
  })
  version: number;

  //Relations
  @OneToOne(() => Transmitter)
  @JoinColumn({ name: 'transmitter' })
  transmitter: Transmitter;

  @OneToOne(() => Receptors)
  @JoinColumn({ name: 'receptor' })
  receptor: Receptors;

  @OneToOne(() => Digital_tax_stamp)
  @JoinColumn({ name: 'digital_tax_stamp' })
  digital_tax_stamp: Digital_tax_stamp;

  @OneToOne(() => Payroll)
  @JoinColumn({ name: 'payroll' })
  payroll: Payroll;

  @OneToOne(() => Payments)
  @JoinColumn({ name: 'payment' })
  payment: Payments;

  @ManyToOne(
    () => TaxesWithholdings,
    (tax_withholdings) => tax_withholdings.cfdi,
    {
      eager: true,
      cascade: true,
    },
  )
  @JoinColumn({ name: 'taxes_withholdings' })
  taxes_withholdings: TaxesWithholdings;

  @ManyToOne(() => TaxesTrasnfers, (tax_trasnfers) => tax_trasnfers.cfdi, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'taxes_trasnfers' })
  taxes_trasnfers: TaxesTrasnfers;

  @ManyToOne(() => RelatedCfdi, (related_cfdi) => related_cfdi.cfdi, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'related_cfdi' })
  related_cfdi: RelatedCfdi;

  @ManyToOne(() => Concepts, (concepts) => concepts.cfdi, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'concepts' })
  concepts: Concepts[];
}

export const getCfdiClass = () => Cfdi;
