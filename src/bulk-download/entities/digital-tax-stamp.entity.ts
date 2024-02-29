import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'digital_tax_stamp' })
@ObjectType()
export class Digital_tax_stamp {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: '' })
  digital_tax_stamp_id: string;

  @Column('date')
  @Field(() => Date, { description: '' })
  stamp_date: Date;

  @Column('bigint', { unique: true })
  @Field(() => Int, { description: '' })
  sat_certificate_num: number;

  @Column('text', { unique: true })
  @Field(() => String, { description: '' })
  rfc_cro_certif: string;

  @Column('text', { unique: true })
  @Field(() => String, { description: '' })
  cfd_stamp: string;

  @Column('text', { unique: true })
  @Field(() => String, { description: '' })
  stamp_sat: string;

  @Column('uuid', { unique: true })
  @Field(() => String, { description: '' })
  uuid: string;

  @Column('int')
  @Field(() => Int, { description: '' })
  version: number;
}
