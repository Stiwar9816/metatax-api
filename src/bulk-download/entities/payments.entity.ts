import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentRelatedDocument } from './index';

@Entity({ name: 'payments' })
@ObjectType()
export class Payments {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: '' })
  payment_id: string;

  @Column('date')
  @Field(() => Date, { description: '' })
  payment_date: Date;

  @Column('int')
  @Field(() => Int, { description: '' })
  payment_form_p: number;

  @Column('float4')
  @Field(() => Float, { description: '' })
  currency_p: number;

  @Column('float4')
  @Field(() => Float, { description: '' })
  exchange_rate_p: number;

  @Column('float4')
  @Field(() => Float, { description: '' })
  amount: number;

  // Relations
  @ManyToOne(
    () => PaymentRelatedDocument,
    (payment_related_document) => payment_related_document.payments,
    {
      eager: true,
      cascade: true,
    },
  )
  @JoinColumn({ name: 'payment_related_document' })
  payment_related_document: PaymentRelatedDocument[];
}

export const getPaymentsClass = () => Payments;
