import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'receiver_payroll' })
@ObjectType()
export class ReceiverPayroll {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: '' })
  receiver_payroll_id: string;

  @Column('text', { unique: true })
  @Field(() => String, {
    description:
      'CURP del receptor del comprobante de nómina cuando es una persona física.',
  })
  curp: string;

  @Column('int')
  @Field(() => Int, { description: 'Tipo de contrato que tiene el trabajador' })
  contract_type: number;

  @Column('int')
  @Field(() => Int, {
    description: `Clave del régimen por el cual se tiene contratado al trabajador, conforme con el catálogo publicado en el portal
  del SAT en internet`,
  })
  regime_type: number;

  @Column('text')
  @Field(() => String, {
    description: 'Número de empleado de 1 a 15 posiciones',
  })
  employee_number: string;

  @Column('int')
  @Field(() => Int, {
    description: 'Forma en que se establece el pago del salario',
  })
  payment_period: number;

  @Column('text')
  @Field(() => String, {
    description: `Clave de la entidad federativa en donde el receptor del recibo prestó el servicio, conforme al catálogo de
  estados publicado en el Portal del SATv`,
  })
  fed_ent_key: string;

  @Column('bigint')
  @Field(() => Float, {
    description: `Número de seguridad social del trabajador. Se debe ingresar cuando se cuente con él, o se esté obligado
  conforme a otras disposiciones distintas a las fiscales`,
  })
  social_security_number: number;

  @Column('text')
  @Field(() => String, {
    description:
      'Indica si el trabajador está asociado a un sindicato. Si se omite se asume que no está asociado a algún sindicato',
  })
  unionized: string;

  @Column('date')
  @Field(() => Date, {
    description: `Fecha de inicio de la relación laboral entre el empleador y el empleado. Se expresa en la forma aaaa-mm-dd, de
  acuerdo con la especificación ISO 8601. Se debe ingresar cuando se cuente con él, o se esté obligado conforme a
  otras disposiciones distintas a las fiscales`,
  })
  employment_start_date: Date;

  @Column('text')
  @Field(() => String, {
    description: `Número de semanas o el periodo de años, meses y días que el empleado ha mantenido relación laboral con el
  empleador. Se debe ingresar cuando se cuente con él, o se esté obligado conforme a otras disposiciones
  distintas a las fiscales`,
  })
  seniority: string;

  @Column('int')
  @Field(() => Int, {
    description: `Tipo de jornada que cubre el trabajador. Se debe ingresar cuando se esté obligado conforme a otras
  disposiciones distintas a las fiscales`,
  })
  day_type: number;

  @Column('text')
  @Field(() => String, {
    description: 'Puesto asignado al empleado o actividad que realiza',
  })
  job: string;

  @Column('int')
  @Field(() => Int, {
    description: `Clave conforme a la Clase en que deben inscribirse los patrones, de acuerdo con las actividades que
  desempeñan sus trabajadores, según lo previsto en el artículo 196 del Reglamento en Materia de Afiliación
  Clasificación de Empresas, Recaudación y Fiscalización, o conforme con la normatividad del Instituto de
  Seguridad Social del trabajador. Catálogo publicado en el Portal del SAT en internet. Se debe ingresar cuando se
  cuente con él, o se esté obligado conforme a otras disposiciones distintas a las fiscales.`,
  })
  job_risk: number;

  @Column('int')
  @Field(() => Int, {
    description:
      'Clave del Banco conforme al catálogo, donde se realiza el depósito de nómina',
  })
  bank: number;

  @Column('bigint')
  @Field(() => Float, {
    description: `Cuenta bancaria a 11 posiciones o número de teléfono celular a 10 posiciones o número de tarjeta de crédito,
  débito o servicios a 15 ó 16 posiciones o la CLABE a 18 posiciones o número de monedero electrónico, donde se
  realiza el depósito de nómina`,
  })
  bank_account: number;

  @Column('float4')
  @Field(() => Float, {
    description: `Retribución otorgada al trabajador, que se integra por los pagos hechos en efectivo por cuota diaria,
  gratificaciones, percepciones, alimentación, habitación, primas, comisiones, prestaciones en especie y
  cualquiera otra cantidad o prestación que se entregue al trabajador por su trabajo, sin considerar los conceptos
  que se excluyen de conformidad con el Artículo 27 de la Ley del Seguro Social, o la integración de los pagos
  conforme la normatividad del Instituto de Seguridad Social del trabajador. (Se emplea para pagar las cuotas y
  aportaciones de Seguridad Social). Se debe ingresar cuando se esté obligado conforme a otras disposiciones
  distintas a las fiscales`,
  })
  base_wage_cot_apor: number;

  @Column('float4')
  @Field(() => Float, {
    description: `Salario que se integra con los pagos hechos en efectivo por cuota diaria, gratificaciones, percepciones,
  habitación, primas, comisiones, prestaciones en especie y cualquier otra cantidad o prestación que se entregue
  al trabajador por su trabajo, de conformidad con el Art. 84 de la Ley Federal del Trabajo. (Se utiliza para el
  cálculo de las indemnizaciones).Se debe ingresar cuando se esté obligado conforme a otras disposiciones
  distintas a las fiscales`,
  })
  integrated_daily_wage: number;
}
