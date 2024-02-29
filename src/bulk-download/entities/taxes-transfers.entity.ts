import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { getCfdiClass } from './cfdi.entity';

@Entity({ name: 'taxes_trasnfers' })
@ObjectType()
export class TaxesTrasnfers {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: '' })
  tax_trasnfer_id: string;

  @Column('float4')
  @Field(() => Float, {
    description: '',
  })
  base: number;

  @Column('float4')
  @Field(() => Float, {
    description: '',
  })
  amount: number;

  @Column('int')
  @Field(() => Int, {
    description: '',
  })
  tax: number;

  @Column('float4')
  @Field(() => Float, {
    description: '',
  })
  rate_or_fee: number;

  @Column('text')
  @Field(() => String, {
    description: '',
  })
  factor_type: string;

  @Column('float4')
  @Field(() => Float, {
    description: '',
  })
  total_transfers: number;

  // Relations
  @OneToMany(() => getCfdiClass(), (cfdi) => cfdi.taxes_trasnfers)
  cfdi: ReturnType<typeof getCfdiClass>;
}
