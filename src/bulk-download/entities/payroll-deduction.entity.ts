import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { getPayrollClass } from './payroll.entity';

@Entity({ name: 'payroll_deduction' })
@ObjectType()
export class PayrollDeduction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: '' })
  payroll_deduction_id: string;

  @Column('int')
  @Field(() => Int, {
    description:
      'Clave agrupadora que clasifica la deducción conforme al catálogo publicado en el Portal del SAT en internet',
  })
  deduction_type: number;

  @Column('bigint')
  @Field(() => Float, {
    description: `Clave de deducción de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15
  caracteres.`,
  })
  key: number;

  @Column('text')
  @Field(() => String, {
    description: 'Descripción del concepto de deducción.',
  })
  concept: string;

  @Column('float4')
  @Field(() => Float, { description: 'Importe del concepto de deducción' })
  amount: number;

  @Column('float4')
  @Field(() => Float, {
    description: `Total de deducciones que se relacionan en el comprobante, donde la clave de tipo de deducción sea distinta a la
  002 correspondiente a ISR.`,
  })
  total_other_deductions: number;

  @Column('float4')
  @Field(() => Float, {
    description: `Total de los impuestos federales retenidos, es decir, donde la clave de tipo de deducción sea 002
  correspondiente a ISR`,
  })
  total_taxes_withheld: number;

  // Relations
  @OneToMany(
    () => getPayrollClass(),
    (payrolls) => payrolls.payroll_deduction,
  )
  payroll: ReturnType<typeof getPayrollClass>;
}
