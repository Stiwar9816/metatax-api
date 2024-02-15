import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Transmitter, Receptors, Concepts, Taxes } from './index';

@Entity({ name: 'cfdis' })
@ObjectType({
  description:
    'Scheme where user cfdi information is stored of the services of sat',
})
export class Cfdi {
  @PrimaryColumn('uuid')
  @Field(() => String, {
    description: 'Id UUID of digital tax stamping',
  })
  id: string;

  @Column('timestamp')
  @Field(() => Date)
  issue_date: Date;

  @Column('bigint')
  @Field(() => Float, {
    description: 'Certificate number  of CFDI',
  })
  certificate_number: number;

  @Column('text')
  @Field(() => String, {
    description: 'Payment conditions of CFDI',
  })
  payment_conditions: string;

  @Column('float8')
  @Field(() => Float, {
    description: 'subtotal CFDI',
  })
  subtotal: number;

  @Column('text')
  @Field(() => String, {
    description: 'Currency type',
  })
  currency: string;

  @Column('float8')
  @Field(() => Float, {
    description: 'Total CDFI invoice amount',
  })
  total: number;

  @Column('text')
  @Field(() => String, {
    description: 'CFDI voucher type',
  })
  voucher_type: string;

  @Column('int')
  @Field(() => Int, {
    description: 'Number exportatcion CFDI',
  })
  exportation: number;

  @Column('text')
  @Field(() => String)
  payment_method: string;

  @Column('int')
  @Field(() => Int)
  expedition_place: number;

  @Column('float8')
  @Field(() => Float)
  total_taxes_tranferred: number;

  @Column('float8')
  @Field(() => Float)
  total_taxes_withheld: number;

  @Column('timestamp')
  @Field(() => Date)
  timbrado_date: Date;

  @Column('text')
  @Field(() => String)
  prov_cerfit_rfc: string;

  @Column('text')
  @Field(() => String)
  certifi_sat_number: string;

  //Relations

  @OneToMany(() => Transmitter, (transmitter) => transmitter.cfdi, {lazy:true, eager:true, cascade: true })
  transmitters: Transmitter;

  @OneToMany(() => Receptors, (receptors) => receptors.cfdi, {lazy:true, eager:true, cascade: true })
  receptors: Receptors;

  @OneToMany(() => Concepts, (concepts) => concepts.cfdi, {lazy:true, eager:true, cascade: true })
  concepts: Concepts[];

  @OneToMany(() => Taxes, (tax) => tax.cfdi, {lazy:true, eager:true, cascade: true })
  taxes: Taxes[];
}

export const getCfdiClass = () => Cfdi;