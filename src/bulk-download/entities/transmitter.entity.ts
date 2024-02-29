import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'transmitter' })
@ObjectType({
  description:
    'Scheme where user trasnmitter information is stored of the services of sat',
})
export class Transmitter {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  transmitter_id: number;

  @Column('text', { unique: true })
  @Field(() => String, {
    description:
      'Nombre, denominación o razón social del contribuyente emisor del comprobante.',
  })
  name: string;

  @Column('text', { unique: true })
  @Field(() => String, {
    description:
      'Clave del Registro Federal de Contribuyentes correspondiente al contribuyente emisor del comprobante.',
  })
  rfc: string;

  @Column('text')
  @Field(() => String, {
    description:
      'Clave del régimen del contribuyente emisor al que aplicará el efecto fiscal de este comprobante.',
  })
  fiscal_regime: string;
}
