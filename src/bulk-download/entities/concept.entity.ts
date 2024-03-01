import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { getCfdiClass } from './cfdi.entity';
import { TaxConcepts } from './index';

@Entity({ name: 'concepts' })
@ObjectType()
export class Concepts {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, {
    description:
      'Scheme where user concepts information is stored of the services of sat',
  })
  concept_id: string;

  @Column('int')
  @Field(() => Int, {
    description: `Clave del producto o del servicio amparado por el presente concepto. Es requerido y deben utilizar las claves del
    catálogo de productos y servicios, cuando los conceptos que registren por sus actividades correspondan con
    dichos conceptos.`,
  })
  clave_prod_serv: number;

  @Column('int')
  @Field(() => Int, {
    description:
      'Cantidad de bienes o servicios del tipo particular definido por el presente concepto.',
  })
  quantity: number;

  @Column('text')
  @Field(() => String, {
    description: `Clave de unidad de medida estandarizada aplicable para la cantidad expresada en el concepto. La unidad debe
    corresponder con la descripción del concepto.`,
  })
  unit_code: string;

  @Column('text')
  @Field(() => String, {
    description:
      'Descripción del bien o servicio cubierto por el presente concepto.',
  })
  unit: string;

  @Column('text')
  @Field(() => String, {
    description:
      'Descripción del bien o servicio cubierto por el presente concepto.',
  })
  description: string;

  @Column('float4')
  @Field(() => Float, {
    description:
      'Suma de los campos "total de percepciones" y "total de otros pagos".',
  })
  unit_value: number;

  @Column('float4')
  @Field(() => Float, {
    description:
      'Suma de los campos "total de percepciones" y "total de otros pagos".',
  })
  amount: number;

  @Column('int')
  @Field(() => Int, {
    description:
      'Expresa si la operación comercial es objeto o no de impuesto.',
  })
  object_imp: number;

  // Relations
  @OneToMany(() => getCfdiClass(), (cfdi) => cfdi.concepts)
  cfdi: ReturnType<typeof getCfdiClass>;

  @ManyToOne(() => TaxConcepts, (tax_concepts) => tax_concepts.concepts, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'tax_concepts' })
  tax_concepts: TaxConcepts[];
}

export const getConceptClass = () => Concepts;
