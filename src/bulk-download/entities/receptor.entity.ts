import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'receptors' })
@ObjectType({
  description:
    'Scheme where user receptor information is stored of the services of sat',
})
export class Receptors {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  receptor_id: number;

  @Column('text', { unique: true })
  @Field(() => String, {
    description:
      'Clave del Registro Federal de Contribuyentes correspondiente al contribuyente receptor del comprobante.',
  })
  rfc: string;

  @Column('text', { unique: true })
  @Field(() => String, {
    description:
      'Nombre, denominación o razón social del contribuyente receptor del comprobante.',
  })
  name: string;

  @Column('int')
  @Field(() => Int, {
    description:
      'Código postal del domicilio fiscal del receptor del comprobante (trabajador asalariado o asimilado a salarios).',
  })
  recipient_fiscal_address: number;

  @Column('int')
  @Field(() => Int, {
    description:
      'Clave del régimen fiscal del contribuyente receptor al que aplicará el efecto fiscal de este comprobante.',
  })
  recipient_fiscal_regime: number;

  @Column('text')
  @Field(() => String, {
    description: 'Clave del uso que dará a esta factura el receptor del CFDI.',
  })
  cfdi_use: string;
}
