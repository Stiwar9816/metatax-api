import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { getPayrollClass } from './payroll.entity';

@Entity({ name: 'payroll_other_payments' })
@ObjectType()
export class PayrollOtherPayments {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: '' })
  payroll_other_payments_id: string;

  @Column('int')
  @Field(() => Int, {
    description: `Clave agrupadora bajo la cual se clasifica el otro pago conforme al catálogo publicado en el Portal del SAT en
  Internet.`,
  })
  type_other_payment: number;

  @Column('bigint')
  @Field(() => Float, {
    description: `Clave de otro pago de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15
  caracteres.`,
  })
  key: number;

  @Column('text')
  @Field(() => String, { description: 'Descripción del concepto de otro pago' })
  concept: string;

  @Column('float4')
  @Field(() => Float, { description: 'Importe del concepto de otro pago' })
  amount: number;

  @Column('float4')
  @Field(() => Float, {
    description:
      'Subsidio causado conforme a la tabla del subsidio para el empleo publicada en el Anexo 8 de la RMF vigente',
  })
  subsidy_caused: number;

  // Relations
  @OneToMany(
    () => getPayrollClass(),
    (payrolls) => payrolls.payroll_other_payments,
  )
  payroll: ReturnType<typeof getPayrollClass>;
}
