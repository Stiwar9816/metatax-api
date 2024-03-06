import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'issuer_payroll' })
@ObjectType()
export class IssuerPayroll {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: '' })
  issuer_payroll_id: string;

  @Column('text')
  @Field(() => String, {
    description: `Registro patronal, clave de ramo - pagaduría o la que le asigne la institución de seguridad social al patrón, a 20
  posiciones máximo. Se debe ingresar cuando se cuente con él, o se esté obligado conforme a otras disposiciones
  distintas a las fiscales.`,
  })
  employer_register: string;
}
