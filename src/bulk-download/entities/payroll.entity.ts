import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IssuerPayroll } from './issuer-payroll.entity';
import { ReceiverPayroll } from './receiver-payroll.entity';
import { PayrollPerceptions } from './payroll_perceptions.entity';
import { PayrollDeduction } from './payroll-deduction.entity';
import { PayrollOtherPayments } from './payroll-other-payments.entity';

@Entity({ name: 'payroll' })
@ObjectType()
export class Payroll {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: '' })
  payrrol_id: string;

  @Column('text')
  @Field(() => String, {
    description:
      'Tipo de nómina, puede ser O = Nómina ordinaria o E = Nómina extraordinaria.',
  })
  payroll_type: string;

  @Column('date')
  @Field(() => Date, {
    description: `Fecha efectiva de erogación del gasto. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO
    8601`,
  })
  payment_date: Date;

  @Column('date')
  @Field(() => Date, {
    description: `Fecha inicial del período de pago. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO
  8601`,
  })
  initial_payment_date: Date;

  @Column('date')
  @Field(() => Date, {
    description: `Fecha final del período de pago. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601`,
  })
  payment_end_date: Date;

  @Column('int')
  @Field(() => Int, { description: 'Número o la fracción de días pagados.' })
  number_days_paid: number;

  @Column('float4')
  @Field(() => Float, { description: 'Suma de las deducciones aplicables' })
  total_deductions: number;

  @Column('float4')
  @Field(() => Float, { description: 'Suma de las percepciones' })
  total_perceptions: number;

  @Column('float4')
  @Field(() => Float, { description: 'Suma de otros pagos' })
  total_other_payments: number;

  @Column('float')
  @Field(() => Float, { description: 'Versión del complemento.' })
  version: number;

  // Relations
  @OneToOne(() => IssuerPayroll)
  @JoinColumn({ name: 'issuer_payroll' })
  issuer_payroll: IssuerPayroll;

  @OneToOne(() => ReceiverPayroll)
  @JoinColumn({ name: 'receiver_payroll' })
  receiver_payroll: ReceiverPayroll;

  @ManyToOne(
    () => PayrollPerceptions,
    (payroll_perception) => payroll_perception.payroll,
    {
      eager: true,
      cascade: true,
    },
  )
  @JoinColumn({ name: 'payroll_perceptions' })
  payroll_perceptions: PayrollPerceptions[];

  @ManyToOne(
    () => PayrollDeduction,
    (payroll_deduction) => payroll_deduction.payroll,
    {
      eager: true,
      cascade: true,
    },
  )
  @JoinColumn({ name: 'payroll_deduction' })
  payroll_deduction: PayrollDeduction[];

  @ManyToOne(
    () => PayrollOtherPayments,
    (payroll_other_payment) => payroll_other_payment.payroll,
    {
      eager: true,
      cascade: true,
    },
  )
  @JoinColumn({ name: 'payroll_other_payments' })
  payroll_other_payments: PayrollOtherPayments[];
}

export const getPayrollClass = () => Payroll;
