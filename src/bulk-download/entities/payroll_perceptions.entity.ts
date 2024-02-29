import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { getPayrollClass } from './payroll.entity';

@Entity({ name: 'payroll_perceptions' })
@ObjectType()
export class PayrollPerceptions {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: '' })
  payroll_perceptions_id: string;

  @Column('int')
  @Field(() => Int, {
    description: `Clave agrupadora bajo la cual se clasifica la percepción conforme al catálogo publicado en el Portal del SAT en
  Internet.`,
  })
  perception_type: number;

  @Column('bigint')
  @Field(() => Float, {
    description: `Clave de percepción de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15
  caracteres`,
  })
  key: number;

  @Column('text')
  @Field(() => String, {
    description: 'Descripción del concepto de percepción',
  })
  concept: string;

  @Column('float4')
  @Field(() => Float, {
    description: 'Importe gravado de un concepto de percepción',
  })
  tax_amount: number;

  @Column('float4')
  @Field(() => Float, {
    description: 'Importe exento de un concepto de percepción',
  })
  exempt_amount: number;

  @Column('float4')
  @Field(() => Float, {
    description:
      'Total de percepciones gravadas que se relacionan en el comprobante',
  })
  tax_total: number;

  @Column('float4')
  @Field(() => Float, {
    description:
      'Total de percepciones exentas que se relacionan en el comprobante',
  })
  total_exempt: number;

  @Column('float4')
  @Field(() => Float, {
    description:
      'Total de percepciones brutas (gravadas y exentas) por sueldos y salarios y conceptos asimilados a salarios',
  })
  total_salaries: number;

  // Relations
  @OneToMany(() => getPayrollClass(), (payrolls) => payrolls.payroll_perceptions)
  payroll: ReturnType<typeof getPayrollClass>;
}
