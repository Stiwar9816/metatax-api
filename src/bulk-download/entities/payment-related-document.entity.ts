import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { getPaymentsClass } from './payments.entity';

@Entity({ name: 'payment_related_document' })
@ObjectType()
export class PaymentRelatedDocument {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: '' })
  payment_related_document_id: string;

  @Column('text', { unique: true })
  @Field(() => String, { description: '' })
  document_id: string;

  @Column('text')
  @Field(() => String, { description: '' })
  serie: string;

  @Column('bigint', { unique: true })
  @Field(() => Float, { description: '' })
  folio: number;

  @Column('text')
  @Field(() => String, { description: '' })
  currency_dr: string;

  @Column('float4')
  @Field(() => Float, { description: '' })
  exchange_rate_dr: number;

  @Column('text')
  @Field(() => String, { description: '' })
  payment_method_dr: string;

  @Column('int')
  @Field(() => Int, { description: '' })
  partial_number: number;

  @Column('float4')
  @Field(() => Float, { description: '' })
  imp_balance_ant: number;

  @Column('float4')
  @Field(() => Float, { description: '' })
  imp_paid: number;

  @Column('int')
  @Field(() => Int, { description: '' })
  imp_unpaid_balance: number;

  // Relations
  @OneToMany(
    () => getPaymentsClass(),
    (payment) => payment.payment_related_document,
  )
  payments: ReturnType<typeof getPaymentsClass>;
}
